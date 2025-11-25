import IssueDetails from '@/components/issues/issue-details';
import IssueDetailsTools from '@/components/issues/issue-details-tools';
import { getIssueById } from '@/lib/db/issues';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) notFound();

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
      <IssueDetails issue={issue} />
      <IssueDetailsTools issueId={issue.id} />
    </div>
  );
}
