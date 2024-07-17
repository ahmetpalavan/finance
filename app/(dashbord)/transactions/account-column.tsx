import { useOpenAccount } from '~/features/accounts/hooks/use-open-account';
import { cn } from '~/lib/utils';

type AccountColumnProps = {
  id: string;
  accountId: string;
  account: string;
};

export const AccountColumn = ({ id, accountId, account }: AccountColumnProps) => {
  const { onOpen } = useOpenAccount();

  const onClick = () => {
    onOpen(accountId);
  };

  return (
    <div className={cn('cursor-pointer hover:underline flex items-center')} onClick={onClick}>
      {account}
    </div>
  );
};
