import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BACKEND_BASE_URL, HEADER_APPLICATION_JSON, ITask } from '../../shared';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const deleteTask = async (id: Pick<ITask, 'id'>) => {
    if (!BACKEND_BASE_URL) {
      throw new Error('BACKEND_BASE_URL is not defined');
    }

    const response = await fetch(`${BACKEND_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: { HEADER_APPLICATION_JSON },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    return response.json();
  };

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting task:', error.message);
    },
  });
};
