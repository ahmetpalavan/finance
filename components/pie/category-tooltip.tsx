import { Separator } from '~/components/ui/separator';
import { formatCurrency } from '~/lib/utils';

export const CategoryTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className='rounded-md bg-white shadow-md border overflow-hidden'>
      <div className='text-sm p-2 px-3 bg-muted text-muted-foreground'>{name}</div>
      <Separator />
      <div className='p-2 px-3 space-y-1'>
        <div className='flex items-center gap-x-4 justify-between'>
          <div className='flex items-center gap-x-2 justify-between'>
            <div className='size-1.5 bg-green-500 rounded-full' />
            <span className='text-sm text-muted-foreground'>Expenses</span>
            <span className='text-sm font-medium text-right'>{formatCurrency(value * -1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
