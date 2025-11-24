'use client';

import { createIssue } from '@/actions/issue';
import { createIssueSchema, TCreateIssue } from '@/schemas/issue.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import MarkdownEditor from '../shared/markdown-editor';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

export default function CreateIssueForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { theme } = useTheme();
  const form = useForm<TCreateIssue>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(data: TCreateIssue) {
    startTransition(() => {
      createIssue(data).then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          router.push(`/issues/${res.success.data.id}`);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        className='space-y-3 max-w-4xl'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <span className='inline-flex self-end'>
                <FormLabel>Title</FormLabel>
              </span>
              <FormControl>
                <Input {...field} placeholder='Title...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <span className='inline-flex self-end'>
                <FormLabel>Description</FormLabel>
              </span>
              <FormControl>
                <MarkdownEditor
                  {...field}
                  placeholder='Description...'
                  options={{
                    theme: theme === 'light' ? 'light' : 'dark',
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={pending}>
          {pending ? 'Creating...' : 'Create'}
        </Button>
        {error && <p className='bg-destructive/80 p-4 text-primary'>{error}</p>}
      </form>
    </Form>
  );
}
