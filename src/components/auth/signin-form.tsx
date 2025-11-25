'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginSchema, TLoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SOCIALS } from '@/configs/socials.config';
import { signIn } from 'next-auth/react';
import { PAGES } from '@/configs/pages.config';

export default function SigninForm() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSubmit(data: TLoginSchema) {
    console.log(data);
  }

  async function handleSocial(name: string) {
    await signIn(name, { callbackUrl: PAGES.ISSUES });
  }

  return (
    <Card className='min-w-sm w-auto border-none'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className='text-center text-xs uppercase font-semibold'>or</p>
            {SOCIALS.map((social) => (
              <Button
                key={social.name}
                type='button'
                variant='outline'
                onClick={() => handleSocial(social.name)}
              >
                <social.icon />
                {social.displayName}
              </Button>
            ))}

            <Button type='submit'>Submit</Button>
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}
