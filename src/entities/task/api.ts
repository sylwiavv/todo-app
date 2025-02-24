import { useQuery } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '../../shared/config';

export const fetchTasks = async () => {
  if (!BACKEND_BASE_URL) {
    throw new Error('Failed to fetch tasks');
  }

  const response = await fetch(`${BACKEND_BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const useTasks = () => {
  return useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });
};
