'use client';

import { Loader2, Plus } from 'lucide-react';
import { columns } from '~/app/(dashbord)/accounts/columns';
import { DataTable } from '~/components/data-table';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { useBulkDeleteAccounts } from '~/features/accounts/api/use-bulk-delete';
import { useGetAccounts } from '~/features/accounts/api/use-get-accounts';
import { useNewAccount } from '~/features/accounts/hooks/use-new-account';

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  const { data, isLoading } = useGetAccounts();
  const deleteAccounts = useBulkDeleteAccounts();
  const accounts = data ?? [];

  const isDisabled = deleteAccounts.isPending || isLoading;

  if (isLoading) {
    return (
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='h-8 w-48' />
          </CardHeader>
          <CardContent>
            <div className='h-[500px] w-full flex items-center justify-center'>
              <Loader2 className='size-6 text-slate-600 animate-spin' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='line-clamp-1 text-xl'>Accounts</CardTitle>
          <Button onClick={onOpen}>
            <Plus size={16} />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            disabled={isDisabled}
            columns={columns}
            data={accounts}
            filterKey='name'
            onDelete={(ids) => {
              const extractedIds = ids.map((row) => row.original.id);
              deleteAccounts.mutate({ ids: extractedIds });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
