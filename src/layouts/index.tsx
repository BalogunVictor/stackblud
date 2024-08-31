import React, { ReactNode } from 'react';
import Header from '@ui/Header';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
