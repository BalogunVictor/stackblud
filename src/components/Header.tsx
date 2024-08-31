import React from 'react';
import Link from 'next/link';

import { DropMenu } from './Dropdown';

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-3">
        <Link href="/">
          <h1 className="flex flex-wrap text-sm font-bold sm:text-xl">
            <span className="text-slate-500">Victor</span>
            <span className="text-slate-700">Store</span>
          </h1>
        </Link>
        <DropMenu />
      </div>
    </header>
  );
}
