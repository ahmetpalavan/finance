'use client';

import { format } from 'date-fns';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CustomTooltip } from './custom-tooltip';

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const AreaVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <defs>
          <linearGradient id='income' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#00e676' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#00e676' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='expenses' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#ff1744' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#ff1744' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          tickLine={false}
          dataKey={'date'}
          tickFormatter={(date) => format(date, 'dd MMM')}
          tickMargin={16}
          style={{
            fontSize: '12px',
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type='monotone'
          dataKey='income'
          stackId='income'
          strokeWidth={2}
          stroke='#00e676'
          fill='url(#income)'
          className='drop-shadow-sm'
        />
        <Area
          type='monotone'
          dataKey='expenses'
          stackId='expenses'
          strokeWidth={2}
          stroke='#ff1744'
          fill='url(#expenses)'
          className='drop-shadow-sm'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
