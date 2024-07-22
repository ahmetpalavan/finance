'use client';

import { Loader2, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { DataTable } from '~/components/data-table';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { transactions as transactionSchema } from '~/db/schema';
import { useSelectAccount } from '~/features/accounts/hooks/use-select-account';
import { useBulkCreateTransactions } from '~/features/transactions/api/use-bulk-create-transactions';
import { useBulkDeleteTransactions } from '~/features/transactions/api/use-bulk-delete-transactions';
import { useNewTransaction } from '~/features/transactions/hooks/use-new-transaction';
import { ImportCard } from './import-card';
import { UploadButton } from './upload-button';
import { columns } from './columns';
import { useGetTransactions } from '~/features/transactions/api/use-get-transactions';

enum TransactionType {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAl_IMPORT_STATE = {
  data: [],
  errors: [],
  meta: {},
};

const AccountsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const [type, setType] = useState<TransactionType>(TransactionType.LIST);
  const [results, setResults] = useState<typeof INITIAl_IMPORT_STATE>(INITIAl_IMPORT_STATE);

  const handleUpload = useCallback((res: typeof INITIAl_IMPORT_STATE) => {
    setResults(res);
    setType(TransactionType.IMPORT);
  }, []);

  const onCancelImport = useCallback(() => {
    setResults(INITIAl_IMPORT_STATE);
    setType(TransactionType.LIST);
  }, []);

  const { onOpen } = useNewTransaction();
  const getTransactions = useGetTransactions();
  const createTransactions = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactions = getTransactions.data || [];
  console.log('🚀 ~ AccountsPage ~ transactions:', transactions);

  const isDisabled = deleteTransactions.isPending || getTransactions.isLoading;

  const onSubmitImport = async (values: (typeof transactionSchema.$inferInsert)[]) => {
    const accountId = await confirm();
    if (!accountId) return;

    const data = values.map((transaction) => ({
      ...transaction,
      accountId: accountId as string,
    }));

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (getTransactions.isLoading) {
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

  if (type === TransactionType.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard data={results.data} onCancel={onCancelImport} onSubmit={onSubmitImport} />
      </>
    );
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='line-clamp-1 text-xl'>Transaction History</CardTitle>
          <div className='flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center'>
            <Button className='w-full lg:w-auto' onClick={onOpen}>
              <Plus size={16} />
              Add New
            </Button>
            <UploadButton onUpload={handleUpload} />
          </div>
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
