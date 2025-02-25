'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../../shared/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
} from '../../../shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/components/ui/select';
import { ITask } from '../../../shared/types/taskTypes';
import { useSetTaskAsCompleted } from '../hooks/useSetTaskAsComplited';
import { TaskCompletedSchema } from '../schemas';
import Task from './Task';

const TaskEditForm = ({
  task,
  setCompletedDialogOpen,
}: {
  task: ITask;
  setCompletedDialogOpen: (open: boolean) => void;
}) => {
  const { mutate: setTaskAsCompleted, isPending } = useSetTaskAsCompleted();

  const { title, description, createdAt, completed } = task;
  const form = useForm<z.infer<typeof TaskCompletedSchema>>({
    resolver: zodResolver(TaskCompletedSchema),
    defaultValues: {
      completed: task.completed,
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = ({ completed }: z.infer<typeof TaskCompletedSchema>) => {
    const updatedTask: ITask = {
      ...task,
      completed,
    };

    console.log(completed, 'completed');

    setTaskAsCompleted(updatedTask, {
      onSuccess: () => {
        form.reset();
        setCompletedDialogOpen(false);
      },
    });
  };

  return (
    <>
      <Task title={title} description={description} createdAt={createdAt} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mt-1"
      >
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is your task completed?</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value === 'yes')}
                value={field.value ? 'yes' : 'no'}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choose..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Task'}
        </Button>
      </form>
    </>
  );
};

export default TaskEditForm;
