import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEditTask } from './useEditTask';

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

describe('useEditTask hook', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Long description',
    completed: false,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully edit task description', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ ...mockTask, title: 'Short description' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useEditTask(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ ...mockTask, description: 'Short description' });

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/tasks/${mockTask.id}`),
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mockTask, description: 'Short description' }),
      })
    );
  });

  it('should successfully edit task title', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...mockTask, title: 'New Title' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useEditTask(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ ...mockTask, title: 'New Title' });

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/tasks/${mockTask.id}`),
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mockTask, title: 'New Title' }),
      })
    );
  });

  it('should handle API errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({ message: 'API error' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useEditTask(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockTask);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error).toBeInstanceOf(Error);

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle API error when user sent an empty title', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({ message: 'API error' }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useEditTask(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ ...mockTask, title: '' });

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/tasks/${mockTask.id}`),
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mockTask, title: '' }),
      })
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  // result.current.mutate(mockTask);

  //   await waitFor(() => {
  //     expect(result.current.isError).toBe(true);
  //   });

  //     expect(result.current.error).toBeDefined();
  //     expect(result.current.error).toBeInstanceOf(Error);

  //     expect(fetch).toHaveBeenCalledTimes(1);
  //   });
});
