'use client';

import { FileSearch, Loader2, PieChart, Radar, Target } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieVariant } from './pie-variant';
import { RadarVariant } from './radar-variant';
import { RadialVariant } from './radial-variant';
import { Skeleton } from '../ui/skeleton';

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const SpendingPie = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState('pie');

  const onTypeChange = useCallback((type: string) => {
    setChartType(type);
  }, []);

  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-2xl line-clamp-2'>Categories</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
            <SelectValue placeholder='Select chart type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pie'>
              <div className='flex items-center'>
                <PieChart className='size-4 shrink-0 mr-2' />
                <span className='line-clamp-1'>Pie</span>
              </div>
            </SelectItem>
            <SelectItem value='radar'>
              <div className='flex items-center'>
                <Radar className='size-4 shrink-0 mr-2' />
                <span className='line-clamp-1'>Radar</span>
              </div>
            </SelectItem>
            <SelectItem value='radial'>
              <div className='flex items-center'>
                <Target className='size-4 shrink-0 mr-2' />
                <span className='line-clamp-1'>Target</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
            <FileSearch className='size-6 text-muted-foreground' />
            <p className='text-muted-foreground'>No data available</p>
          </div>
        ) : (
          <>
            {chartType === 'pie' && <PieVariant data={data} />}
            {chartType === 'radar' && <RadarVariant data={data} />}
            {chartType === 'radial' && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const SpendingPieSkeleton = () => {
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex lg:flex-row space-y-2 lg:space-y-0 justify-between'>
        <Skeleton className='w-48 h-8' />
        <Skeleton className='w-full lg:w-[120px] h-8' />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
          <Loader2 className='size-8 animate-spin text-muted-foreground' />
        </div>
      </CardContent>
    </Card>
  );
};
