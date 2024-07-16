'use client';

import { useCallback } from 'react';
import { z } from 'zod';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { insertAccountSchema } from '~/db/schema';
import { useNewAccount } from '~/features/accounts/hooks/use-new-account';
import { useCreateAccount } from '~/features/accounts/api/use-create-account';
import { AccountForm } from '~/features/accounts/components/account-form';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();

  const onSubmit = useCallback((values: FormValues) => {
    mutation.mutateAsync(values).then(() => {
      onClose();
    });
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>Create a new account</SheetTitle>
          <SheetDescription>Create a new account to access all features.</SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{ name: '' }} />
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
