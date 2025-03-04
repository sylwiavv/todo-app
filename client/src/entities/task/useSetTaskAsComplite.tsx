import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BACKEND_BASE_URL, ITask } from '../../shared';

export const useSetTaskAsCompleted = () => {
  const queryClient = useQueryClient();

  const setTaskAsCompleted = async (task: ITask) => {
    if (!BACKEND_BASE_URL) {
      throw new Error('BACKEND_BASE_URL is not defined');
    }

    const response = await fetch(`${BACKEND_BASE_URL}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        completed: Boolean(task.completed),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to edit task');
    }

    return response.json();
  };

  return useMutation({
    mutationFn: setTaskAsCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error editing task:', error.message);
    },
  });
};
