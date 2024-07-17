'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { InferResponseType } from 'hono';
import { client } from '~/lib/hono';
import { format } from 'date-fns';
import { formatCurrency } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import { AccountColumn } from './account-column';
import { CategoryColumn } from './category-column';
import { Action } from './actions';

export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>['data'][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;
      return <span>{format(date, 'dd MMMM, yyyy')}</span>;
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell({ row }) {
      return <CategoryColumn id={row.original.id} category={row.original.category} categoryId={row.original.categoryId} />;
    },
  },
  {
    accessorKey: 'payee',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Payee
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell({ row }) {
      return <span>{row.original.payee}</span>;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell({ row }) {
      const amount = parseFloat(row.getValue('amount') as string);
      return <Badge variant={amount > 0 ? 'success' : 'destructive'}>{formatCurrency(amount)}</Badge>;
    },
  },
  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Account
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell({ row }) {
      return <AccountColumn id={row.original.id} accountId={row.original.accountId} account={row.original.account} />;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <Action id={row.original.id} />,
  },
];
