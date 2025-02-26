import { create } from 'zustand';
import { ITask } from '../../../shared';

interface TasksState {
  currentTask: ITask | null;
  setCurrentTask: (task: ITask | null) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  currentTask: null,
  setCurrentTask: (task) => set({ currentTask: task }),
}));
