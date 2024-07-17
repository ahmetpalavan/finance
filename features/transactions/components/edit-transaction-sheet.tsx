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
import { useConfirm } from '~/hooks/use-confirm';
import { useCreateTransaction } from '../api/use-create-transaction';
import { useDeleteTransaction } from '../api/use-delete-transaction';
import { useEditTransaction } from '../api/use-edit-transaction';
import { useGetTransaction } from '../api/use-get-transaction';
import { useOpenTransaction } from '../hooks/use-open-account';
import { TransactionForm } from './transaction-form';

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

const EditTransactionSheet = () => {
  const { onClose, open, id } = useOpenTransaction();
  const transactionQuery = useGetTransaction(id);
  console.log('🚀 ~ EditTransactionSheet ~ transactionQuery:', transactionQuery.data);
  const { mutateAsync, isPending: transactionPending } = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);
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

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this transaction? This action cannot be undone.',
    'Delete transaction'
  );

  const onDelete = useCallback(async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }, [confirm, deleteMutation, onClose]);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      await mutateAsync(values);
      onClose();
    },
    [mutateAsync, onClose]
  );

  const isPending =
    transactionPending || createCategory.isPending || createAccount.isPending || transactionQuery.isLoading || createMutation.isPending;

  const loading = transactionQuery.isLoading || deleteMutation.isPending;

  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: '',
        categoryId: '',
        amount: '',
        date: new Date(),
        payee: '',
        notes: '',
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit transaction</SheetTitle>
            <SheetDescription>Edit your transaction details.</SheetDescription>
          </SheetHeader>
          {loading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-6 text-slate-600 animate-spin text-muted-foreground' />
            </div>
          ) : (
            <TransactionForm
              id={id}
              accountOptions={accountOptions}
              categoryOptions={categoryOptions}
              defaultValues={defaultValues}
              disabled={isPending}
              onSubmit={onSubmit}
              onDelete={onDelete}
              oneCreateAccount={oneCreateAccount}
              oneCreateCategory={oneCreateCategory}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionSheet;
