'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    id: 1,
    path: '/' as const,
    title: 'Home',
  },
  //   {
  //     id: 21,
  //     path: '/about' as const,
  //     title: 'About',
  //   },
];

const NavLinks = () => {
  const pathname = usePathname();

  return navItems.map(({ id, title, path }) => (
    <li key={id} className="min-w-max">
      <Link href={path} className={path === pathname ? `text-primary` : ''}>
        {title}
      </Link>
    </li>
  ));
};

export default NavLinks;
