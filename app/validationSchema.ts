import { z } from 'zod';
import { Status } from '@prisma/client';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z
    .string({ error: 'Description is required' })
    .min(1, 'Description is required')
    .max(65535),
});

export type IssueData = z.infer<typeof issueSchema>;

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z
    .string({ error: 'Description is required' })
    .min(1, 'Description is required')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'Assigned user ID is required')
    .max(255)
    .optional()
    .nullable(),
  status: z.nativeEnum(Status).optional(),
});

export type PatchIssueData = z.infer<typeof patchIssueSchema>;
