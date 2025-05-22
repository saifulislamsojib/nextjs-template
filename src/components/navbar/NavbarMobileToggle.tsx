'use client';

import type { WithChildrenProps } from '@/types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NavbarMobileToggle = ({ children }: WithChildrenProps) => {
  const [navToggle, setNavToggle] = useState(false);

  return (
    <>
      <button
        onClick={() => setNavToggle((pre) => !pre)}
        className="cursor-pointer text-3xl select-none lg:hidden"
      >
        {navToggle ? <X /> : <Menu />}
      </button>
      <ul
        className={`bg-accent text-foreground absolute top-[60px] flex min-h-[calc(100vh-60px)] w-full max-w-xs flex-col items-center gap-2 px-2 py-2 transition-all duration-300 lg:static lg:min-h-0 lg:max-w-none lg:flex-row lg:justify-end lg:gap-5 lg:bg-transparent lg:px-0 lg:py-0 ${
          navToggle ? 'left-0' : '-left-full'
        }`}
      >
        {children}
      </ul>
    </>
  );
};

export default NavbarMobileToggle;
