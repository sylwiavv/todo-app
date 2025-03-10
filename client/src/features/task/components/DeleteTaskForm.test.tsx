import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importujemy QueryClient
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useDeleteTask } from '../../../entities/task/useDeleteTask';
import { ITask } from '../../../shared';
import DeleteTaskForm from './DeleteTaskForm';

jest.mock('../../../entities/task/useDeleteTask', () => ({
  useDeleteTask: jest.fn(),
}));

describe('DeleteTaskForm', () => {
  const mockSetDialogOpen = jest.fn();
  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    createdAt: new Date(),
    completed: false,
  };

  const queryClient = new QueryClient();

  it('should delete task and call mutation', async () => {
    const mockDeleteTask = jest.fn().mockResolvedValue('Task deleted');
    (useDeleteTask as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteTask,
      isPending: false,
      isError: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteTaskForm task={mockTask} setDialogOpen={mockSetDialogOpen} />
      </QueryClientProvider>
    );

    const yesButton = screen.getByRole('button', { name: /yes/i });
    fireEvent.click(yesButton);

    await waitFor(() =>
      expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id)
    );

    expect(mockSetDialogOpen).toHaveBeenCalledWith(false);
  });

  it('should display error message when deletion fails', async () => {
    const mockDeleteTask = jest
      .fn()
      .mockRejectedValue(new Error('Failed to delete task'));
    (useDeleteTask as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteTask,
      isPending: false,
      isError: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteTaskForm task={mockTask} setDialogOpen={mockSetDialogOpen} />
      </QueryClientProvider>
    );

    const yesButton = screen.queryByRole('button', { name: /yes/i });

    expect(yesButton).toBeNull();

    expect(
      screen.getByText(/An error occurred. Please refresh the page./)
    ).toBeInTheDocument();
  });

  it('should not call deleteTask when clicking "No" button', () => {
    const mockDeleteTask = jest.fn();
    (useDeleteTask as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteTask,
      isPending: false,
      isError: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteTaskForm task={mockTask} setDialogOpen={mockSetDialogOpen} />
      </QueryClientProvider>
    );

    const noButton = screen.getByRole('button', { name: /no/i });
    fireEvent.click(noButton);

    expect(mockDeleteTask).not.toHaveBeenCalled();
    expect(mockSetDialogOpen).toHaveBeenCalledWith(false);
  });
});
