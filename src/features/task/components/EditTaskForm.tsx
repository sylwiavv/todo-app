'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useEditTask } from '../../../entities/task/useEditTask';
import { Button } from '../../../shared/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../shared/components/ui/form';
import { Input } from '../../../shared/components/ui/input';
import { ITask, ITaskFormProps } from '../../../shared/types/taskTypes';
import { TaskSchema } from '../schemas';

const TaskEditForm = ({ task, setDialogOpen }: ITaskFormProps) => {
  const { title, description } = task;

  const { mutate: editTask, isPending, isError } = useEditTask();

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title,
      description,
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = ({ title, description }: z.infer<typeof TaskSchema>) => {
    const updatedTask: ITask = {
      ...task,
      title,
      description,
    };

    editTask(updatedTask, {
      onSuccess: () => {
        form.reset();
        setDialogOpen(false);
      },
    });
  };

  if (isError) {
    return <p>An error occurred. Please refresh the page.</p>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              {errors.title && (
                <FormMessage>{errors.title.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter task description" {...field} />
              </FormControl>
              {errors.description && (
                <FormMessage>{errors.description.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Task'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default TaskEditForm;
