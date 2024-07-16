'use client';

import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import { z } from 'zod';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { insertAccountSchema } from '~/db/schema';
import { AccountForm } from '~/features/accounts/components/account-form';
import { useConfirm } from '~/hooks/use-confirm';
import { useDeleteAccount } from '../api/use-delete-account';
import { useEditAccount } from '../api/use-edit-account';
import { useGetAccount } from '../api/use-get-account';
import { useOpenAccount } from '../hooks/use-open-account';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

const EditAccountSheet = () => {
  const { onClose, open, id } = useOpenAccount();
  const { data, isLoading } = useGetAccount(id);
  const { mutateAsync, isPending } = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this account? This action cannot be undone.',
    'Delete account'
  );

  const onSubmit = useCallback(
    async (values: FormValues) => {
      await mutateAsync(values);
      onClose();
    },
    [mutateAsync, onClose]
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

  const loading = isLoading || deleteMutation.isPending;

  const values = data ? { name: data.name } : { name: '' };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit account</SheetTitle>
            <SheetDescription>Edit your account details.</SheetDescription>
          </SheetHeader>
          {loading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-6 text-slate-600 animate-spin text-muted-foreground' />
            </div>
          ) : (
            <AccountForm onDelete={onDelete} id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={values} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditAccountSheet;
