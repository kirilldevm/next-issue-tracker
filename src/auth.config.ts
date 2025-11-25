import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { getUserByEmail } from './lib/db/user';
import { prisma } from './lib/prisma';
import { loginSchema } from './schemas';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedValues = loginSchema.safeParse(credentials!);
        if (!validatedValues.success) {
          return null;
        }
        const { email, password } = validatedValues.data;
        const user = await getUserByEmail(email);
        if (!user || !user.hashedPassword) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        const isOAuth = await prisma.account.findFirst({
          where: {
            userId: user.id,
          },
        });
        if (passwordsMatch) {
          return {
            ...user,
            isOAuth: !!isOAuth,
            noPassword: false,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
