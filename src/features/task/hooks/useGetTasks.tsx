import { useQuery } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '../../../shared';
import { ITask } from '../../../shared/types/taskTypes';
import { useTasksStore } from '../store/taskStore';

export const fetchTasks = async (): Promise<ITask[]> => {
  if (!BACKEND_BASE_URL) {
    throw new Error('BACKEND_BASE_URL is not defined');
  }

  const response = await fetch(`${BACKEND_BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};

export const useTasks = () => {
  const { setTasks } = useTasksStore();

  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
      return tasks;
    },
  });
};
