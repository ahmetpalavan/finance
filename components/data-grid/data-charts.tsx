'use client';

import React from 'react';
import { useGetSummary } from '~/features/summary/api/use-get-summary';
import { Chart, ChartSkeleton } from './chart';
import { Loader2 } from 'lucide-react';
import { SpendingPie, SpendingPieSkeleton } from '../pie';

export const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
          <ChartSkeleton />
        </div>
        <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
          <SpendingPieSkeleton />
        </div>
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
