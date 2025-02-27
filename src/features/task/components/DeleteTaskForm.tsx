'use client';

import { useState } from 'react';
import { useDeleteTask } from '../../../entities/task/useDeleteTask';
import { Button } from '../../../shared/components/ui/button';
import { useTasksStore } from '../store/taskStore';

const DeleteTaskForm = () => {
  const { currentTask, setCurrentTask } = useTasksStore();
  const { mutateAsync: deleteTask, isPending, isError } = useDeleteTask();
  const [error, setError] = useState<string | null>(null);

  if (!currentTask) return null;

  const { id } = currentTask;

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id);
      setCurrentTask(null);
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

  if (error) {
    return <p className="text-red-500">{error}</p>;
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
