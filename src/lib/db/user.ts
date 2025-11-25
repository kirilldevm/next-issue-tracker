import { prisma } from '../prisma';

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getAccountById(id: string) {
  return prisma.account.findFirst({
    where: { userId: id },
  });
}
