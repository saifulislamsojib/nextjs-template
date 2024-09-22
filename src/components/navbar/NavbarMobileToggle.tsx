"use client";

import { LayoutProps } from "@/types";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const NavbarMobileToggle = ({ children }: LayoutProps) => {
  const [navToggle, setNavToggle] = useState(false);

  return (
    <>
      <div
        onClick={() => setNavToggle((pre) => !pre)}
        className="cursor-pointer select-none text-3xl lg:hidden"
      >
        {navToggle ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <ul
        className={`absolute top-[60px] flex min-h-[calc(100vh-60px)] w-full max-w-xs flex-col items-center gap-2 bg-slate-100 px-2 py-2 text-gray-600 transition-all duration-300 lg:static lg:min-h-0 lg:max-w-none lg:flex-row lg:justify-end lg:gap-5 lg:bg-transparent lg:px-0 lg:py-0 ${
          navToggle ? "left-0" : "-left-full"
        }`}
      >
        {children}
      </ul>
    </>
  );
};

export default NavbarMobileToggle;
