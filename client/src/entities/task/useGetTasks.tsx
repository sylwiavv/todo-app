import { useQuery } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '../../shared';
import { ITask } from '../../shared/types/taskTypes';

export const getTasks = async (): Promise<ITask[]> => {
  if (!BACKEND_BASE_URL) {
    throw new Error('BACKEND_BASE_URL is not defined');
  }

  const response = await fetch(
    `https://todo-app-backend-3-git-main-sylwiavvs-projects.vercel.app/tasks`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const data = await response.json();

  return data;
};

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const tasks = await getTasks();
      return tasks;
    },
  });
};
