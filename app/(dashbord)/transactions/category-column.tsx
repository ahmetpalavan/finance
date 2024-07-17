import { TriangleAlert } from 'lucide-react';
import { useOpenCategory } from '~/features/categories/hooks/use-open-category';
import { useOpenTransaction } from '~/features/transactions/hooks/use-open-account';
import { cn } from '~/lib/utils';

type CategoryColumnProps = {
  id: string;
  categoryId: string | null;
  category: string | null;
};

export const CategoryColumn = ({ id, categoryId, category }: CategoryColumnProps) => {
  const { onOpen } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      onOpen(categoryId);
    }
  };

  return (
    <div className={cn('cursor-pointer hover:underline gap-1 flex items-center', !category && 'text-red-500')} onClick={onClick}>
      {!category && <TriangleAlert className='size-3 text-red-500' />}
      {category || 'Uncategorized'}
    </div>
  );
};
