import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from '@ui/ToastContainer';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import 'tailwindcss/tailwind.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <ToastContainer />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
