import { create } from 'zustand';
import { ITask } from '../../../shared';

interface TasksState {
  tasks: ITask[];
  currentTask: ITask | null;
  setTasks: (tasks: ITask[]) => void;
  setCurrentTask: (task: ITask | null) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  currentTask: null,

  setTasks: (tasks) => set({ tasks }),
  setCurrentTask: (task) => set({ currentTask: task }),
}));
