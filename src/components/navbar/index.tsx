import { Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import NavLink from './NavLink';
import NavbarMobileToggle from './NavbarMobileToggle';

const navItems = [
  {
    id: 1,
    path: '/',
    title: 'Home',
  },
  {
    id: 21,
    path: '/about',
    title: 'About',
  },
];

const Navbar = () => {
  const loggedIn = false;

  return (
    <nav className="bg-accent sticky top-0 z-10 border-b py-3 shadow">
      <div className="container flex items-center justify-between lg:gap-10">
        <Link href="/">
          <h3 className="text-accent-foreground min-w-max scroll-m-20 text-2xl font-semibold tracking-tight">
            App Name
          </h3>
        </Link>
        <NavbarMobileToggle>
          {navItems.map(({ id, title, path }) => (
            <li key={id} className="min-w-max">
              <NavLink href={path} activeClassName="text-primary" exact>
                {title}
              </NavLink>
            </li>
          ))}
          {/* any start links */}
          <li className="flex w-full max-w-[400px] items-center rounded-xl bg-white px-2">
            <Search className="text-xl" />
            <input
              type="text"
              className="w-full bg-transparent px-2 py-2 focus:outline-none"
              placeholder="Search here..."
            />
          </li>
          {/* any end links */}
          <li className="flex flex-col items-center gap-2 text-2xl lg:flex-row lg:gap-5">
            {loggedIn ? (
              <Button type="submit">Logout</Button>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </li>
        </NavbarMobileToggle>
      </div>
    </nav>
  );
};

export default Navbar;
