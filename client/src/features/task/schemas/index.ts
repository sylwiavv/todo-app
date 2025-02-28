import * as z from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters.' }),
});

export const TaskCompletedSchema = z.object({
  completed: z.boolean(),
});
