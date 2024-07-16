'use client';

import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import { z } from 'zod';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { useConfirm } from '~/hooks/use-confirm';
import { useOpenCategory } from '../hooks/use-open-category';
import { useGetCategory } from '../api/use-get-category';
import { useEditCategory } from '../api/use-edit-category';
import { useDeleteCategory } from '../api/use-delete-category';
import { insertCategoriesSchema } from '~/db/schema';
import { CategoryForm } from './category-form';

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

const EditCategorySheet = () => {
  const { onClose, open, id } = useOpenCategory();
  const { data, isLoading } = useGetCategory(id);
  const { mutateAsync, isPending } = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this category? This action cannot be undone.',
    'Delete category'
  );

  const onSubmit = useCallback(
    async (values: FormValues) => {
      await mutateAsync(values);
      onClose();
    },
    [mutateAsync, onClose]
  );

  const onDelete = useCallback(async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }, [confirm, deleteMutation, onClose]);

  const loading = isLoading || deleteMutation.isPending;

  const values = data ? { name: data.name } : { name: '' };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit category</SheetTitle>
            <SheetDescription>Categories help you organize your transactions.</SheetDescription>
          </SheetHeader>
          {loading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-6 text-slate-600 animate-spin text-muted-foreground' />
            </div>
          ) : (
            <CategoryForm onDelete={onDelete} id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={values} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategorySheet;
