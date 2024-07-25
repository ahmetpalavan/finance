import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculatePercentageChange(previous: number, current: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

export const fillMissingDays = (
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date
) => {
  if (activeDays.length === 0) {
    return [];
  }

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const result = days.map((date) => {
    const day = activeDays.find((d) => isSameDay(d.date, date));

    if (day) {
      return day;
    } else {
      return {
        date: date,
        income: 0,
        expenses: 0,
      };
    }
  });

  return result;
};

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export const formattedRange = (period?: Period) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, 'LLL dd')} - ${format(defaultTo, 'LLL dd')}`;
  }

  if (!period?.to) {
    return `${format(period.from, 'LLL dd')} - ${format(defaultTo, 'LLL dd')}`;
  }

  return format(period.from, 'LLL dd');
};

export const formatPercentage = (
  val: number,
  options: { addPrefix?: boolean } = {
    addPrefix: false,
  }
) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
  }).format(val / 100);

  if (options.addPrefix && val > 0) {
    return `+${formatted}`;
  }

  return formatted;
};
