import React from 'react';
import { DateFilter, AccountFilter } from '~/components/filter';

export const Filter = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2'>
      <AccountFilter />
      <DateFilter />
    </div>
  );
};
