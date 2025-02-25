import { Button } from '../../../shared/components/ui/button';
import { useDeleteTask } from '../hooks/useDeleteTask';

interface IDeleteTaskFormProps {
  id: number;
  setDeleteDialogOpen: (open: boolean) => void;
}

const DeleteTaskForm = ({ id, setDeleteDialogOpen }: IDeleteTaskFormProps) => {
  const { mutate: deleteTask, isPending, isError } = useDeleteTask();

  const handleDeleteTask = () => {
    deleteTask(id);

    setDeleteDialogOpen(false);
  };

  if (isError) {
    return <p>An error occurred. Please refresh the page.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p>Are you sure to delete task?</p>
      <div className="flex gap-2">
        <Button disabled={isPending} variant="ghost" onClick={handleDeleteTask}>
          Yes
        </Button>
        <Button disabled={isPending} onClick={() => setDeleteDialogOpen(false)}>
          No
        </Button>
      </div>
    </div>
  );
};

export default DeleteTaskForm;
