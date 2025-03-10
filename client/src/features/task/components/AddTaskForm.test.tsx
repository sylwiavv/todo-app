import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { useAddTask } from '../../../entities/task/useAddTask';
import AddTaskForm from './AddTaskForm';
import { generateUniqueId } from '../utils/utils';

jest.mock('../../../entities/task/useAddTask');
jest.mock('../utils/utils', () => ({
  generateUniqueId: jest.fn(),
}));

describe('AddTaskForm', () => {
  const mockSetOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields and submit successfully', async () => {
    const mockMutate = jest.fn();
    (useAddTask as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    (generateUniqueId as jest.Mock).mockReturnValue('1');

    render(<AddTaskForm setOpen={mockSetOpen} />);

    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter task description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          createdAt: expect.any(Date),
          completed: false,
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });

    await act(async () => {
      mockMutate.mock.calls[0][1].onSuccess();
    });

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it('should reset form and close modal on successful submission', async () => {
    const mockMutate = jest.fn((data, { onSuccess }) => onSuccess());
    (useAddTask as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
    (generateUniqueId as jest.Mock).mockReturnValue('1');

    render(<AddTaskForm setOpen={mockSetOpen} />);

    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter task description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          createdAt: expect.any(Date),
          completed: false,
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it('should show validation errors when fields are empty', async () => {
    render(<AddTaskForm setOpen={mockSetOpen} />);
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(
        screen.getByText('Title must be at least 3 characters.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Description must be at least 5 characters.')
      ).toBeInTheDocument();
    });
  });
});
