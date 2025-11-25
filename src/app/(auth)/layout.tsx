import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex-1 flex items-center justify-center h-full'>
      {children}
    </div>
  );
}
