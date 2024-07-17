import { SelectSingleEventHandler } from 'react-day-picker';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '~/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
};

export const DatePicker = ({ value, onChange, disabled }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          className={cn('flex w-full justify-start text-left font-normal', !value && 'text-gray-400')}
        >
          <CalendarIcon className='w-4 h-4 mr-2' />
          {value ? format(value, 'PPP') : <span className='text-gray-400'>Select a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar selected={value} mode='single' onSelect={onChange} disabled={disabled} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
