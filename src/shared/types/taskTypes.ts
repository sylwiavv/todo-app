export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  createdAt: Date;
}

export interface ITaskFormProps {
  task: ITask;
  setDialogOpen: (open: boolean) => void;
}
