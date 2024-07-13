import Link from 'next/link';
import React, { FC } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Sheet, SheetTrigger, SheetContent } from '~/components/ui/sheet';
import { useMedia } from 'react-use';
import useStore from '~/hooks/use-store';
import { merriweather } from '~/theme/typography';

interface Props {
  path: string;
  name: string;
  isActive?: boolean;
}

export const NavButton: FC<Props> = ({ path, name, isActive }) => {
  console.log('');
  return (
    <Button
      asChild
      size={'sm'}
      variant={'outline'}
      style={{
        fontFamily: merriweather.style.fontFamily,
      }}
      className={cn(
        'text-blue-500 bg-white hover:bg-white/70 focus:bg-white/70 active:bg-white/90 focus:ring-blue-500 focus:ring-offset-white focus:ring-opacity-50 focus:ring-2 focus:ring-offset-2',
        isActive && 'bg-white/70'
      )}
    >
      <Link href={path}>{name}</Link>
    </Button>
  );
};
