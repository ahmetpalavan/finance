import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { Logo } from '~/components/header/logo';
import { Navigation } from '~/components/header/navigation';
import { WelcomeMessage } from '~/components/welcome-message';
import { Filter } from '~/components/filter';

export const Header = () => {
  return (
    <div className='bg-gradient-to-br from-blue-500 to-blue-700 px-4 py-8 lg:px-14 pb-36 '>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='w-full flex mb-14 justify-between items-center'>
          <div className='w-full flex items-center lg:gap-x-16'>
            <Logo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl='/' />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='size-8 text-slate-200 animate-spin' />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
        <Filter />
      </div>
    </div>
  );
};
