import { auth } from '@/auth';
import IssueForm from '@/components/issues/issue-form';
import { PAGES } from '@/configs/pages.config';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New Issue',
};

export default async function NewIssuePage() {
  const session = await auth();

  if (!session?.user.id) redirect(PAGES.SIGN_IN);

  return <IssueForm />;
}
