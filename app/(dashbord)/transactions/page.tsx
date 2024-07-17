'use client';

import { Loader2, Plus } from 'lucide-react';
import { DataTable } from '~/components/data-table';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { useBulkDeleteTransactions } from '~/features/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '~/features/transactions/api/use-get-transactions';
import { useNewTransaction } from '~/features/transactions/hooks/use-new-transaction';
import { columns } from './columns';

const AccountsPage = () => {
  const { onOpen } = useNewTransaction();
  const { data, isLoading } = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactions = data ?? [];

  const isDisabled = deleteTransactions.isPending || isLoading;

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
          <CardTitle className='line-clamp-1 text-xl'>Transaction History</CardTitle>
          <Button onClick={onOpen}>
            <Plus size={16} />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            disabled={isDisabled}
            columns={columns}
            data={transactions}
            filterKey='payee'
            onDelete={(ids) => {
              const extractedIds = ids.map((row) => row.original.id);
              deleteTransactions.mutate({ ids: extractedIds });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
