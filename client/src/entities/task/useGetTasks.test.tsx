import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetTasks } from './useGetTasks';

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

describe('useGetTasks hook', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return tasks when API call is successful', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: 'Test Task',
              description: 'Description test',
              completed: false,
            },
          ]),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useGetTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toHaveLength(1));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API error'))
    ) as jest.Mock;

    const { result } = renderHook(() => useGetTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);

      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
