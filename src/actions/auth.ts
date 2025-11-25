'use server';

import { prisma } from '@/lib/prisma';
import { loginSchema, TLoginSchema } from './../schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { PAGES } from '@/configs/pages.config';

export async function signInAction(data: TLoginSchema) {
  const validatedValues = loginSchema.safeParse(data);

  if (!validatedValues.success) {
    return {
      error: validatedValues.error,
    };
  }

  const { email, password } = validatedValues.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.hashedPassword) {
    return {
      error: 'Invalid credentials',
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

  if (passwordsMatch) {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    redirect(PAGES.ISSUES);
  }
}
