import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select } from '~/components/select';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { insertTransactionsSchema } from '~/db/schema';
import { DatePicker } from '~/components/date-picker';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { AmountInput } from '~/components/amount-input';
import { convertAmountToMiliunits } from '~/lib/utils';

const formSchema = z.object({
  date: z.coerce.date(),
  amount: z.string(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;
type ApiValues = z.infer<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  oneCreateAccount: (name: string) => void;
  oneCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  oneCreateAccount,
  oneCreateCategory,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = useCallback((values: FormValues) => {
    const amount = parseFloat(values.amount);
    const amountInMiliunits = convertAmountToMiliunits(amount);
    onSubmit({ ...values, amount: amountInMiliunits });
  }, []);

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      onDelete?.();
    });
  }, [onDelete]);

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name='date'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker {...field} value={field.value} onChange={field.onChange} disabled={isPending || disabled} />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='accountId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  options={accountOptions}
                  placeholder='Select an account'
                  disabled={isPending || disabled}
                  onCreate={oneCreateAccount}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='categoryId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  options={categoryOptions}
                  placeholder='Select a category'
                  disabled={isPending || disabled}
                  onCreate={oneCreateCategory}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='payee'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending || disabled} placeholder='Enter a payee' />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='amount'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  onChange={field.onChange}
                  value={field.value ?? ''}
                  disabled={isPending || disabled}
                  placeholder='Enter an amount'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='notes'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={isPending || disabled} value={field.value ?? ''} placeholder='Enter notes' />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending || disabled} className='w-full mt-4'>
          {id ? 'Save' : 'Create Transaction'}
        </Button>
        {!!id && (
          <Button type='button' variant='destructive' disabled={isPending || disabled} onClick={handleDelete} className='w-full mt-4'>
            <Trash size={16} />
            Delete
          </Button>
        )}
      </form>
    </Form>
  );
};
