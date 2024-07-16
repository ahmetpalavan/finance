import { Trash } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { insertAccountSchema } from '~/db/schema';
import { Form, FormControl, FormDescription, FormField, FormMessage, FormItem, FormLabel, useFormField } from '~/components/ui/form';
import { useCallback, useTransition } from 'react';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    startTransition(async () => {
      onSubmit(values);
    });
    console.log('🚀 ~ startTransition ~ values:', values);
  };

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  return (
    <Form {...form}>
      <form className='space-y-12 gap-12 pt-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder='e.g. Cash, Bank, Credit Card' {...field} />
              </FormControl>
              <FormDescription>Enter the name of the account</FormDescription>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending || disabled || !form.formState.isValid} className='w-full'>
          {id ? 'Save' : 'Create'}
        </Button>
        {!!id && (
          <Button type='button' variant='destructive' disabled={isPending || disabled} onClick={handleDelete} className='w-full'>
            <Trash size={16} />
            Delete
          </Button>
        )}
      </form>
    </Form>
  );
};
