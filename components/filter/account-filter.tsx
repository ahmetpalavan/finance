'use client';

import qs from 'query-string';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useGetAccounts } from '~/features/accounts/api/use-get-accounts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCallback } from 'react';
import { useGetSummary } from '~/features/summary/api/use-get-summary';

export const AccountFilter = () => {
  const { data: accounts, isLoading: isLoadingAccount } = useGetAccounts();
  const { data: summary, isLoading: isLoadingSummary } = useGetSummary();
  const router = useRouter();
  const search = useSearchParams();
  const pathname = usePathname();
  const accountId = search.get('accountId') || 'all';
  const from = search.get('from');
  const to = search.get('to');

  const onChange = useCallback(
    (value: string) => {
      const query = {
        accountId: value,
        from,
        to,
      };
      if (value === 'all') {
        query.accountId = '';
      }
      const url = qs.stringifyUrl({ url: pathname, query }, { skipEmptyString: true, skipNull: true });
      router.push(url);
    },
    [search, pathname, from, to, router, search]
  );

  return (
    <Select value={accountId} onValueChange={onChange} disabled={isLoadingAccount || isLoadingSummary}>
      <SelectTrigger className='lg:w-auto w-full font-normal bg-white/10 transition hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 justify-center focus:ring-transparent outline-none focus:bg-white/30 h-9 rounded-md px-3'>
        <SelectValue placeholder='Select account' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All Accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
