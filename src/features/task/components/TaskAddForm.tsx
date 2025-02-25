import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { ITask } from '../../../shared/types/taskTypes';
import { useAddTask } from '../hooks/useAddTask';
import { generateUniqueId } from '../utils/utils';

const TaskAddForm = () => {
  const [task, setTask] = useState<ITask | Partial<ITask>>();

  const { mutate: addTask, isPending } = useAddTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(task, {
      onSuccess: () => {
        setTask({
          id: generateUniqueId(),
          title: '',
          description: '',
          createdAt: new Date(),
          completed: false,
        });
        setOpen(false);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={task?.title || ''}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={task?.description || ''}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Task'}
      </Button>
    </form>
  );
};

export default TaskAddForm;
