'use client';

import { Button } from '~/components/ui/button';
import { useNewAccount } from '~/features/accounts/hooks/use-new-account';

const Dashboard = () => {
  const { onOpen } = useNewAccount();
  return (
    <Button className='mt-12' onClick={onOpen}>
      Create a new account
    </Button>
  );
};

export default Dashboard;
