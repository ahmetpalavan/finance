'use client';

import { useSearchParams } from 'next/navigation';
import { useGetSummary } from '~/features/summary/api/use-get-summary';
import { formattedRange } from '~/lib/utils';
import { FaPiggyBank } from 'react-icons/fa';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { DataCard, DataCardSkeleton } from './data-card';

export const DataGrid = () => {
  const { data, isLoading } = useGetSummary();
  const params = useSearchParams();
  const to = params.get('to') || undefined;
  const from = params.get('from') || undefined;

  const range = formattedRange({ from, to });

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
        <DataCardSkeleton />
        <DataCardSkeleton />
        <DataCardSkeleton />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
      <DataCard
        title='Remaining'
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        range={range}
        icon={FaPiggyBank}
        variant={'warning'}
      />
      <DataCard
        title='Income'
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        range={range}
        icon={FaArrowTrendUp}
        variant={'success'}
      />
      <DataCard
        title='Expenses'
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        range={range}
        icon={FaArrowTrendDown}
        variant={'danger'}
      />
    </div>
  );
};
