import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useCallback } from 'react';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useDeleteCategory } from '~/features/categories/api/use-delete-category';
import { useOpenCategory } from '~/features/categories/hooks/use-open-category';
import { useConfirm } from '~/hooks/use-confirm';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this account? This action cannot be undone.',
    'Delete account'
  );
  const { onOpen, onClose } = useOpenCategory();
  const deleteMutation = useDeleteCategory(id);

  const handleDelete = useCallback(async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }, []);
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='size-8 p-0' variant='ghost'>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            disabled={false}
            onClick={() => {
              onOpen(id);
            }}
          >
            <Edit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
