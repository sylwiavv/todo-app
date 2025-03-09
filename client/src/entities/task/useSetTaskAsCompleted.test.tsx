import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSetTaskAsCompleted } from './useSetTaskAsCompleted';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useSetTaskAsCompleted hook', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Long description',
    completed: false,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully mark task as completed', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...mockTask, completed: true }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useSetTaskAsCompleted(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockTask);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/tasks/${mockTask.id}/completed`),
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mockTask, completed: false }),
      })
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('should handle API errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API error'))
    ) as jest.Mock;

    const { result } = renderHook(() => useSetTaskAsCompleted(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockTask);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
