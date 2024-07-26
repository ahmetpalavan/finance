'use client';

import { format, subDays } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { formattedRange } from '~/lib/utils';

export const DateFilter = () => {
  const router = useRouter();
  const search = useSearchParams();
  const pathname = usePathname();
  const accountId = search.get('accountId');
  const from = search.get('from') || '';
  const to = search.get('to') || '';

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = useCallback(
    (dateRange: DateRange | undefined) => {
      const query = {
        from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd'),
        to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd'),
        accountId,
      };
      const url = qs.stringifyUrl({ url: pathname, query }, { skipEmptyString: true, skipNull: true });
      router.push(url);
    },
    [search, pathname, accountId, router]
  );

  const onReset = useCallback(() => {
    setDate(undefined);
    pushToUrl(undefined);
  }, [pushToUrl]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size='sm'
          variant='outline'
          className='lg:w-auto w-full font-normal bg-white/10 transition hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-white/30 h-9 rounded-md px-3'
        >
          {formattedRange(paramState)}
          <ChevronDown className='size-4 ml-2 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' sideOffset={4} className='lg:w-auto w-full p-0'>
        <Calendar
          disabled={false}
          initialFocus
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className='flex w-full items-center gap-x-2 p-4'>
          <PopoverClose asChild>
            <Button onClick={onReset} disabled={!date?.from || !date?.to} size='sm' variant='outline'>
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => {
                pushToUrl(date);
              }}
              disabled={!date?.from || !date?.to}
              size='sm'
              className='ml-2'
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
