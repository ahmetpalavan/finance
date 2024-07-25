import { format } from 'date-fns';
import { Separator } from '~/components/ui/separator';
import { formatCurrency } from '~/lib/utils';

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const date = payload[0].payload.date;
  const income = payload[0].value;
  const expenses = payload[1].value;

  return (
    <div className='rounded-md bg-white shadow-md border overflow-hidden'>
      <div className='text-sm p-2 px-3 bg-muted text-muted-foreground'>{format(date, 'dd MMM yyyy')}</div>
      <Separator />
      <div className='p-2 px-3 space-y-1'>
        <div className='flex items-center gap-x-4 justify-between'>
          <div className='flex items-center gap-x-2 justify-between'>
            <div className='size-1.5 bg-green-500 rounded-full' />
            <span className='text-sm text-muted-foreground'>Income</span>
            <span className='text-sm font-medium text-right'>{formatCurrency(income)}</span>
          </div>
        </div>
        <div className='flex items-center gap-x-4 justify-between'>
          <div className='flex items-center gap-x-2 justify-between'>
            <div className='size-1.5 bg-red-500 rounded-full' />
            <span className='text-sm text-muted-foreground'>Expense</span>
            <span className='text-sm font-medium text-right'>{formatCurrency(expenses * -1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
