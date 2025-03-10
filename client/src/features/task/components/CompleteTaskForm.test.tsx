import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useSetTaskAsCompleted } from '../../../entities/task/useSetTaskAsCompleted';
import CompleteTaskForm from './CompleteTaskForm';
jest.mock('../../../entities/task/useSetTaskAsCompleted');

jest.mock('../../../entities/task/useSetTaskAsCompleted', () => ({
  useSetTaskAsCompleted: jest.fn(),
}));

beforeEach(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

describe('CompleteTaskForm', () => {
  it('should update status to completed and call mutation', async () => {
    const mockMutate = jest.fn();

    (useSetTaskAsCompleted as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
    });

    const task = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      createdAt: new Date(),
      completed: false,
    };

    const setDialogOpen = jest.fn();
    render(<CompleteTaskForm task={task} setDialogOpen={setDialogOpen} />);

    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    const selectItemYes = await screen.findByRole('option', { name: /yes/i });
    fireEvent.click(selectItemYes);

    const submitButton = screen.getByRole('button', { name: /update task/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockMutate).toHaveBeenCalledTimes(1));

    const [taskData] = mockMutate.mock.calls[0];
    expect(taskData).toEqual({
      ...task,
      completed: true,
    });
  });
});
