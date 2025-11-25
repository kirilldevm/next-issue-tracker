import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/pages.config';
import Link from 'next/link';

export default function PageNotFound({}) {
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-full'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p>This page is not found</p>
      <Button asChild variant={'link'} className='uppercase'>
        <Link href={PAGES.HOME} className='text-xl font-semibold'>
          Home
        </Link>
      </Button>
    </div>
  );
}
