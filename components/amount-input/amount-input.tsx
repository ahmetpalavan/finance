import CurrencyInput from 'react-currency-input-field';
import { Info, MinusCircle, PlusCircle } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { useCallback } from 'react';

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const AmountInput = ({ value, onChange, placeholder, disabled }: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const isReserveValue = useCallback(() => {
    if (!value) return;
    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  }, [value, onChange]);

  return (
    <div className='relative'>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type='button'
              onClick={isReserveValue}
              className={cn(
                'bg-slate-300 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition',
                isIncome && 'bg-green-500 hover:bg-green-700',
                isExpense && 'bg-red-500 hover:bg-red-700'
              )}
            >
              {!parsedValue && <Info className='size-3 text-white' />}
              {isIncome && <MinusCircle className='size-3 text-white' />}
              {isExpense && <PlusCircle className='size-3 text-white' />}
            </button>
          </TooltipTrigger>
          <TooltipContent>Use [+] to add an expense or [-] to add an income.</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix='$'
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        decimalScale={2}
        decimalsLimit={2}
        onValueChange={onChange}
        className='pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      />
      <p className='text-muted-foreground text-sm mt-1'>
        {isIncome && (
          <span className='text-green-500 text-sm font-medium'>
            This is an income <PlusCircle className='size-3 inline-block' />
          </span>
        )}
        {isExpense && (
          <span className='text-red-500 text-sm font-medium'>
            This is an expense <MinusCircle className='size-3 inline-block' />
          </span>
        )}
      </p>
    </div>
  );
};
