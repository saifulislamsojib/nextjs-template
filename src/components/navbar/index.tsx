import { Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import NavbarMobileToggle from './NavbarMobileToggle';
import NavLinks from './NavLinks';

const Navbar = () => {
  const loggedIn = false;

  return (
    <nav className="sticky top-0 z-10 border-b bg-accent py-3 shadow">
      <div className="container flex items-center justify-between lg:gap-10">
        <Link href="/">
          <h3 className="min-w-max scroll-m-20 text-2xl font-semibold tracking-tight text-accent-foreground">
            App Name
          </h3>
        </Link>
        <NavbarMobileToggle>
          <NavLinks />
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
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
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
