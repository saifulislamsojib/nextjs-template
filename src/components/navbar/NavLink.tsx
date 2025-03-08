'use client';

import { clsx } from 'clsx';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { AnchorHTMLAttributes } from 'react';

interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  activeClassName?: string;
  exact?: boolean;
}

const NavLink = ({ children, href, exact = false, activeClassName, ...props }: NavLinkProps) => {
  const path = usePathname();
  const active = typeof href === 'string' ? (exact ? path === href : path.startsWith(href)) : false;
  const classes = clsx(props.className, active && activeClassName);
  if (classes) {
    props.className = classes;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
