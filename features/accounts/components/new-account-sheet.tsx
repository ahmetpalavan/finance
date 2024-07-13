'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import useNewAccount from '../hooks/use-new-account';
import { AccountForm } from './account-form';

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className=''>
        <SheetHeader>
          <SheetTitle>Create a new account</SheetTitle>
          <SheetDescription>Create a new account to access all features.</SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={() => {}} disabled={false} />
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
