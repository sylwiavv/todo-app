'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddTask } from '../../../entities/task/useAddTask';
import { Button } from '../../../shared/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../shared/components/ui/form';
import { Input } from '../../../shared/components/ui/input';
import { ITask } from '../../../shared/types/taskTypes';
import { TaskSchema } from '../schemas';
import { generateUniqueId } from '../utils/utils';

const AddTaskForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { mutate: addTask, isPending } = useAddTask();

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof TaskSchema>) => {
    const newTask: ITask = {
      id: generateUniqueId(),
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      completed: false,
    };

    addTask(newTask, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

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

        <Button type="submit" className="" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Task'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddTaskForm;
