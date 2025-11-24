import { PAGES } from '@/configs/pages.config';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function IssuesPage() {
  return (
    <div>
      <Button>
        <Link href={PAGES.NEW_ISSUE}>New Issue</Link>
      </Button>
    </div>
  );
}
