import IssueStatusBadge from '@/components/issues/issue-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIssueById } from '@/lib/db/issues';
import { Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) notFound();

  return (
    <div>
      <h1 className='font-bold text-3xl'>{issue.title}</h1>

      <div className='flex gap-3 my-3'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-muted-foreground'>Description:</CardTitle>
        </CardHeader>
        <CardContent className='prose dark:prose-invert'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
}
