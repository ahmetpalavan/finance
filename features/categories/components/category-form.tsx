import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { insertCategoriesSchema } from '~/db/schema';

const formSchema = insertCategoriesSchema.pick({
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

export const CategoryForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
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
    startTransition(async () => {
      onDelete?.();
    });
  }, [onDelete]);

  return (
    <Form {...form}>
      <form className='space-y-12' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input disabled={disabled} placeholder='e.g. Food, Shopping, Rent' {...field} className='mt-4' />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending || disabled || !form.formState.isValid} className='w-full mt-4'>
          {id ? 'Save' : 'Create Category'}
        </Button>
        {!!id && (
          <Button type='button' variant='destructive' disabled={isPending || disabled} onClick={handleDelete} className='w-full mt-4'>
            <Trash size={16} />
            Delete Category
          </Button>
        )}
      </form>
    </Form>
  );
};
