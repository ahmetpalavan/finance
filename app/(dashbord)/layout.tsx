import React, { FC } from 'react';
import { Header } from '~/components/header';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='px-3 lg:px-14'>{children}</main>
    </>
  );
};

export default DashboardLayout;
