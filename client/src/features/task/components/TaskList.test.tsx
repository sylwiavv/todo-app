import { render, screen } from '@testing-library/react';
import { useGetTasks } from '../../../entities/task/useGetTasks';
import TaskList from './TaskList';

jest.mock('../../../entities/task/useGetTasks');
jest.mock('./TaskItem', () => () => (
  <div data-testid="task-item">Mocked Task</div>
));

describe('TaskList Component', () => {
  test('Displays "Loading tasks..." message when data is loading', () => {
    (useGetTasks as jest.Mock).mockReturnValue({ isPending: true });

    render(<TaskList />);

    expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();
  });

  test('Displays "No tasks available." message when task list is empty', () => {
    (useGetTasks as jest.Mock).mockReturnValue({ data: [], isPending: false });

    render(<TaskList />);

    expect(screen.getByText(/No tasks available./i)).toBeInTheDocument();
  });

  test('Displays an error message when isError is true', () => {
    (useGetTasks as jest.Mock).mockReturnValue({ isError: true });

    render(<TaskList />);

    expect(
      screen.getByText(/An error occurred. Please refresh the page./i)
    ).toBeInTheDocument();
  });

  test('Renders the task list when data is available', () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        createdAt: '2024-03-06',
        completed: false,
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Desc 2',
        createdAt: '2024-03-06',
        completed: true,
      },
    ];

    (useGetTasks as jest.Mock).mockReturnValue({
      data: mockTasks,
      isPending: false,
    });

    render(<TaskList />);

    expect(screen.getAllByTestId('task-item')).toHaveLength(mockTasks.length);
  });
});
