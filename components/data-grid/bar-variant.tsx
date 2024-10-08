'use client';

import { format } from 'date-fns';
import { Area, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CustomTooltip } from './custom-tooltip';

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
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
        <Bar dataKey='income' fill='url(#income)' className='drop-shadow-sm' />
        <Bar dataKey='expenses' fill='url(#expenses)' className='drop-shadow-sm' />
      </BarChart>
    </ResponsiveContainer>
  );
};
