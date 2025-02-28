import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSetTaskAsCompleted } from '../../../entities/task/useSetTaskAsComplite';
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
import { ITaskFormProps } from '../../../shared/types/taskTypes';
import { TaskCompletedSchema } from '../schemas';
import Task from './Task';

const CompleteTaskForm = ({ task, setDialogOpen }: ITaskFormProps) => {
  const { title, description, createdAt, completed } = task;

  const {
    mutate: setTaskAsCompleted,
    isPending,
    isError,
  } = useSetTaskAsCompleted();

  const form = useForm<z.infer<typeof TaskCompletedSchema>>({
    resolver: zodResolver(TaskCompletedSchema),
    defaultValues: {
      completed,
    },
  });

  const onSubmit = ({ completed }: z.infer<typeof TaskCompletedSchema>) => {
    const updatedTask: ITask = {
      ...task,
      completed,
    };

    setTaskAsCompleted(updatedTask, {
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
    <>
      <Task title={title} description={description} createdAt={createdAt} />
      <FormProvider {...form}>
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
      </FormProvider>
    </>
  );
};

export default CompleteTaskForm;
