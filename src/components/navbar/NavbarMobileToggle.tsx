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
        className="text-3xl cursor-pointer select-none lg:hidden"
      >
        {navToggle ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <ul
        className={`flex flex-col lg:flex-row absolute lg:static top-[60px] bg-slate-100 lg:bg-transparent items-center gap-2 lg:gap-5 text-gray-600 w-full max-w-xs lg:max-w-none lg:justify-end py-2 lg:py-0 min-h-[calc(100vh-60px)] lg:min-h-0 transition-all duration-300 px-2 lg:px-0 ${
          navToggle ? "left-0" : "-left-full"
        }`}
      >
        {children}
      </ul>
    </>
  );
};

export default NavbarMobileToggle;
