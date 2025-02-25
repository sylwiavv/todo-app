'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ITask } from '../../../shared';
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
import { useSetTaskAsCompleted } from '../hooks/useSetTaskAsComplited';
import { TaskCompletedSchema } from '../schemas';
import { useTasksStore } from '../store/taskStore';
import Task from './Task';

const TaskEditForm = () => {
  const { mutate: setTaskAsCompleted, isPending } = useSetTaskAsCompleted();

  const { currentTask, setCurrentTask } = useTasksStore();

  const form = useForm<z.infer<typeof TaskCompletedSchema>>({
    resolver: zodResolver(TaskCompletedSchema),
    defaultValues: {
      completed: currentTask?.completed,
    },
  });

  const {
    formState: { isSubmitSuccessful },
  } = form;

  const onSubmit = ({ completed }: z.infer<typeof TaskCompletedSchema>) => {
    const updatedTask: ITask = {
      ...currentTask,
      completed,
    };

    setTaskAsCompleted(updatedTask, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  if (!currentTask) return;

  const { title, description, createdAt } = currentTask;

  if (isSubmitSuccessful) {
    setCurrentTask(null);
  }

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
