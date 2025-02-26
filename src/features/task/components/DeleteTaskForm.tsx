'use client';
import { Button } from '../../../shared/components/ui/button';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useTasksStore } from '../store/taskStore';

const DeleteTaskForm = () => {
  const { currentTask, setCurrentTask } = useTasksStore();
  const { mutate: deleteTask, isPending, isError } = useDeleteTask();

  if (!currentTask) return;

  const { id } = currentTask;

  const handleDeleteTask = () => {
    deleteTask(id);
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
