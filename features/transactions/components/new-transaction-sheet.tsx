'use client';

import { Loader2 } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { z } from 'zod';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { insertTransactionsSchema } from '~/db/schema';
import { useCreateAccount } from '~/features/accounts/api/use-create-account';
import { useGetAccounts } from '~/features/accounts/api/use-get-accounts';
import { useCreateCategory } from '~/features/categories/api/use-create-category';
import { useGetCategories } from '~/features/categories/api/use-get-categories';
import { useCreateTransaction } from '../api/use-create-transaction';
import { useNewTransaction } from '../hooks/use-new-transaction';
import { TransactionForm } from './transaction-form';

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransaction();
  const getCategories = useGetCategories();
  const createCategory = useCreateCategory();
  const getAccounts = useGetAccounts();
  const createAccount = useCreateAccount();

  const oneCreateCategory = useCallback((name: string) => {
    createCategory.mutateAsync({ name });
  }, []);

  const categoryOptions =
    useMemo(
      () =>
        getCategories.data?.map((category) => ({
          label: category.name,
          value: category.id,
        })),
      [getCategories.data]
    ) ?? [];

  const oneCreateAccount = useCallback((name: string) => {
    createAccount.mutateAsync({ name });
  }, []);

  const accountOptions =
    useMemo(() => getAccounts.data?.map((account) => ({ label: account.name, value: account.id })), [getAccounts.data]) ?? [];

  const onSubmit = useCallback((values: FormValues) => {
    createMutation.mutateAsync(values).then(() => {
      onClose();
    });
  }, []);

  const isPending = createMutation.isPending || createCategory.isPending || createAccount.isPending;

  const isLoading = getAccounts.isLoading || getCategories.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>Create a new transaction</SheetTitle>
          <SheetDescription>Enter the details of the transaction you want to create.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='size-6 text-slate-600 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <TransactionForm
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            defaultValues={undefined}
            disabled={isPending}
            onDelete={undefined}
            onSubmit={onSubmit}
            oneCreateAccount={oneCreateAccount}
            oneCreateCategory={oneCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
