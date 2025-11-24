import { TIssue } from '@/schemas/issue.schema';
import prisma from '../prisma';

export async function getAllIssues() {
  return prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
  }) as Promise<TIssue[]>;
}

export async function getIssueById(id: string) {
  return prisma.issue.findUnique({
    where: { id },
  }) as Promise<TIssue>;
}
