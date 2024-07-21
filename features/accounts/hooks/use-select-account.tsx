import { useCallback, useMemo, useRef, useState } from 'react';
import { Select } from '~/components/select';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { useCreateAccount } from '../api/use-create-account';
import { useGetAccounts } from '../api/use-get-accounts';

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = useCallback(
    (name: string) => {
      accountMutation.mutate({ name });
    },
    [accountMutation, accountQuery]
  );

  const accountOptions = useMemo(
    () =>
      (accountQuery.data ?? []).map((account) => ({
        value: account.id,
        label: account.name,
      })),
    [accountQuery.data]
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null);
  const selectValue = useRef<string>();

  const confirm = useCallback(() => {
    return new Promise((resolve) => {
      setPromise({ resolve });
      setIsOpen(true);
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setPromise(null);
  }, []);

  const handleConfirm = useCallback(() => {
    promise?.resolve(selectValue.current);
    handleClose();
  }, [promise, handleClose]);

  const handleCancel = useCallback(() => {
    promise?.resolve(undefined);
    handleClose();
  }, [promise, handleClose]);

  const ConfirmDialog = () => (
    <Dialog open={promise !== null} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>Please select an account to continue or create a new account.</DialogDescription>
        </DialogHeader>
        <Select
          options={accountOptions}
          onChange={(value) => {
            selectValue.current = value;
          }}
          placeholder='New Account'
          onCreate={onCreateAccount}
          disabled={accountMutation.isPending || accountQuery.isLoading}
        />
        <DialogFooter>
          <Button variant={'outline'} onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
