'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useMedia } from 'react-use';
import { NavButton } from '~/components/nav-button';
import useStore from '~/hooks/use-store';
import { Sheet, SheetTrigger, SheetContent } from '~/components/ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { merriweather } from '~/theme/typography';

const routes = [
  {
    path: '/',
    name: 'Overview',
  },
  {
    path: '/transactions',
    name: 'Transactions',
  },
  {
    path: '/accounts',
    name: 'Accounts',
  },
  {
    path: '/categories',
    name: 'Categories',
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useStore();
  const router = useRouter();
  const isMobile = useMedia('(max-width: 1024px)', false);

  const onClick = useCallback(
    (href: string) => {
      router.push(href);
      setIsOpen(false);
    },
    [router, setIsOpen]
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button size='sm' variant='outline'>
            <Menu className='size-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className='px-2'>
          <nav className='flex flex-col gap-y-4 pt-6 items-center'>
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={pathname === route.path ? 'destructive' : 'outline'}
                size='sm'
                style={{
                  fontFamily: merriweather.style.fontFamily,
                }}
                className='w-full justify-start border-none'
                onClick={() => onClick(route.path)}
              >
                {route.name}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className='hidden lg:flex gap-x-2 items-center overflow-x-auto'>
      {routes.map((route, index) => (
        <NavButton key={index} path={route.path} name={route.name} isActive={pathname === route.path} />
      ))}
    </nav>
  );
};
