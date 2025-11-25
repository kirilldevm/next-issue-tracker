import { loginSchema } from './schemas';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './lib/db/user';
import { prisma } from './lib/prisma';

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
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

        const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

        const isOAuth = await prisma.account.findFirst({
          where: {
            providerAccountId: user.id,
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
