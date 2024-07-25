'use client';

import React from 'react';
import { useGetSummary } from '~/features/summary/api/use-get-summary';
import { Chart } from './chart';
import { Loader2 } from 'lucide-react';
import { SpendingPie } from '../pie';

export const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
        <Loader2 className='size-6 text-muted-foreground animate-spin' />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
      <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
        <Chart data={data?.filledDays} />
      </div>
      <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
};
