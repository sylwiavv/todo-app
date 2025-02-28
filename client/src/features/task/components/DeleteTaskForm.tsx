'use client';

import { useDeleteTask } from '../../../entities/task/useDeleteTask';
import { Button } from '../../../shared/components/ui/button';
import { ITaskFormProps } from '../../../shared/types/taskTypes';

const DeleteTaskForm = ({ task, setDialogOpen }: ITaskFormProps) => {
  const { mutateAsync: deleteTask, isPending, isError } = useDeleteTask();

  const { id } = task;

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id);
      setDialogOpen(false);
    } catch (error) {
      throw new Error('Failed to delete task. Please try again.');
    }
  };

  if (isError) {
    return (
      <p className="text-red-500">
        An error occurred. Please refresh the page.
      </p>
    );
  }

  return (
    <div className="flex gap-2">
      <Button disabled={isPending} variant="ghost" onClick={handleDeleteTask}>
        Yes
      </Button>
      <Button disabled={isPending} onClick={() => setDialogOpen(false)}>
        No
      </Button>
    </div>
  );
};

export default DeleteTaskForm;
