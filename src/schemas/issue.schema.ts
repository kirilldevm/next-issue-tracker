import z from 'zod';

export const issueSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .max(255, { message: 'Title must be less than 255 characters' }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});

export type TIssue = z.infer<typeof issueSchema>;

export const createIssueSchema = issueSchema.pick({
  title: true,
  description: true,
});

export type TCreateIssue = z.infer<typeof createIssueSchema>;
