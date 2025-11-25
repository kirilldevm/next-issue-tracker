import { PrismaAdapter } from '@auth/prisma-adapter';
import type { PrismaClient } from '@prisma/client';

/**
 * Fix TS type mismatch between PrismaClient and PrismaAdapter
 */
export function FixedPrismaAdapter(prisma: PrismaClient) {
  return PrismaAdapter(prisma) as any;
}
