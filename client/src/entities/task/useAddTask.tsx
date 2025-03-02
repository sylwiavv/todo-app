import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HEADER_APPLICATION_JSON } from '../../shared';
import { ITask } from '../../shared/types/taskTypes';

export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
console.log(BACKEND_BASE_URL, 'BACKEND_BASE_URL');

export const addTask = async (task: ITask) => {
  if (!BACKEND_BASE_URL) {
    throw new Error('BACKEND_BASE_URL is not defined');
  }

  const response = await fetch(`${BACKEND_BASE_URL}/tasks`, {
    method: 'POST',
    headers: HEADER_APPLICATION_JSON,
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
