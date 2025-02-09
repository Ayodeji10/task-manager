import { z } from 'zod';

export const newTaskSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(60, 'Title cannot be more than 60 characters'),
  description: z
    .string()
    .min(2, 'Description must be at least 2 characters')
    .max(200, 'Description cannot be more than 200 characters'),
  due: z
    .string()
    .min(2, 'Due date is required')
    .refine((val) => new Date(val) >= new Date(), {
      message: 'Date must be today or later',
    }),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['to-do', 'in-progress', 'done']),
});

export type TNewTaskSchema = z.infer<typeof newTaskSchema>;
