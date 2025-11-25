import { PAGES } from '@/configs/pages.config';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function IssueDetailsTools({ issueId }: { issueId: string }) {
  return (
    <div className='col-span-1'>
      <Button asChild>
        <Link href={`${PAGES.ISSUES}/${issueId}/edit`}>
          <Pencil2Icon />
          Edit Issue
        </Link>
      </Button>
    </div>
  );
}
