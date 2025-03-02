import { useQuery } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '../../shared';
import { ITask } from '../../shared/types/taskTypes';

export const getTasks = async (): Promise<ITask[]> => {
  if (!BACKEND_BASE_URL) {
    throw new Error('BACKEND_BASE_URL is not defined');
  }

  const response = await fetch(`https://todo-app-backen22.vercel.app/tasks`);
  console.log(response, 'HELLO');

  console.log(response, 'response');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      return await getTasks();
    },
  });
};
