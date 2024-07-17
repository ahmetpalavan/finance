'use client';

import { useCallback } from 'react';
import { z } from 'zod';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { insertCategoriesSchema } from '~/db/schema';
import { useNewCategory } from '../hooks/use-new-category';
import { CategoryForm } from './category-form';
import { useCreateCategory } from '../api/use-create-category';

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

  const onSubmit = useCallback((values: FormValues) => {
    mutation.mutateAsync(values).then(() => {
      onClose();
    });
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>Create a new category</SheetTitle>
          <SheetDescription>Categories help you organize your transactions.</SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{ name: '' }} />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
