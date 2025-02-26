'use client';

import { useDeleteTask } from '../../../entities/task/useDeleteTask';
import { Button } from '../../../shared/components/ui/button';
import { useTasksStore } from '../store/taskStore';

const DeleteTaskForm = () => {
  const { currentTask, setCurrentTask } = useTasksStore();
  const { mutateAsync: deleteTask, isPending, isError } = useDeleteTask();

  if (!currentTask) return null;

  const { id } = currentTask;

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (isError) {
    return <p>An error occurred. Please refresh the page.</p>;
  }

  return (
    <div className="flex gap-2">
      <Button disabled={isPending} variant="ghost" onClick={handleDeleteTask}>
        Yes
      </Button>
      <Button disabled={isPending} onClick={() => setCurrentTask(null)}>
        No
      </Button>
    </div>
  );
};

export default DeleteTaskForm;
