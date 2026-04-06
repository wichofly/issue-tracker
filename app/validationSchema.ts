import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z
    .string({ error: 'Description is required' })
    .min(1, 'Description is required'),
});

export type CreateIssueForm = z.infer<typeof issueSchema>;
