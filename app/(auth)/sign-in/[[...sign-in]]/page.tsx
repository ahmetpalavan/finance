import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader className='w-10 h-10 animate-spin' />
      </ClerkLoading>
    </div>
  );
}
