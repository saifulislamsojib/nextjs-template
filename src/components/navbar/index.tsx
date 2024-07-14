import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "../ui/button";
import NavLink from "./NavLink";
import NavbarMobileToggle from "./NavbarMobileToggle";

const navItems = [
  {
    id: 1,
    path: "/",
    title: "Home",
  },
  {
    id: 21,
    path: "/about",
    title: "About",
  },
];

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-3 sticky top-0 z-10 border-b shadow">
      <div className="flex items-center justify-between lg:gap-10 container">
        <Link href="/">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-accent min-w-max">
            App Name
          </h3>
        </Link>
        <NavbarMobileToggle>
          {navItems.map(({ id, title, path }) => (
            <li key={id} className="min-w-max">
              <NavLink href={path} activeClassName="text-blue-600" exact>
                {title}
              </NavLink>
            </li>
          ))}
          {/* any start links */}
          <li className="flex items-center bg-slate-200 px-2 w-full max-w-[400px] rounded-xl">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              className="bg-transparent focus:outline-none px-2 py-2 w-full"
              placeholder="Search here..."
            />
          </li>
          {/* any end links */}
          <li className="flex flex-col lg:flex-row items-center text-2xl gap-2 lg:gap-5">
            {false ? (
              <Button type="submit">Logout</Button>
            ) : (
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </li>
        </NavbarMobileToggle>
      </div>
    </nav>
  );
};

export default Navbar;
