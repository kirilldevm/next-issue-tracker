import { Status } from '@prisma/client';
import z from 'zod';

export const issueSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be less than 255 characters' }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.enum(Status).default('OPEN'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TIssue = z.infer<typeof issueSchema>;

export const createIssueSchema = issueSchema.pick({
  title: true,
  description: true,
});

export type TCreateIssue = z.infer<typeof createIssueSchema>;
