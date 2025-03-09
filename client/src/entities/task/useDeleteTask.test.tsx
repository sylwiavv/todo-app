import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeleteTask } from './useDeleteTask'; // Używamy odpowiedniego hooka do usuwania

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test description',
  completed: false,
};

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

describe('useDeleteTask hook', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully delete task', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTask),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useDeleteTask(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockTask.id);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/tasks/${mockTask.id}`),
      expect.objectContaining({
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('should throw error if id is not provided', async () => {
    global.fetch = jest.fn();

    const { result } = renderHook(() => useDeleteTask(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.mutate(undefined);
      } catch (error) {
        expect(error).toEqual(new Error('ID is required to delete the task'));
      }
    });

    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
