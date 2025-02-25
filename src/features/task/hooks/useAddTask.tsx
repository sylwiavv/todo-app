import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BACKEND_BASE_URL, HEADER_APPLICATION_JSON } from '../../../shared';
import { ITask } from '../../../shared/types/taskTypes';

export const addTask = async (task: ITask) => {
  if (!BACKEND_BASE_URL) {
    throw new Error('BACKEND_BASE_URL is not defined');
  }

  const response = await fetch(`${BACKEND_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { HEADER_APPLICATION_JSON },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to add task');
  }

  return response.json();
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
