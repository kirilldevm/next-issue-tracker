'use server';

import prisma from '@/lib/prisma';
import { createIssueSchema, TCreateIssue } from '@/schemas/issue.schema';

export async function createIssue(values: TCreateIssue) {
  try {
    const validated = createIssueSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: validated.error,
      };
    }

    const { title, description } = validated.data;

    const issue = await prisma.issue.create({
      data: {
        title,
        description,
      },
    });

    if (!issue) {
      return {
        error: new Error('Failed to create issue'),
      };
    }

    return { issue };
  } catch (error) {
    console.log(error);

    return {
      error,
    };
  }
}
