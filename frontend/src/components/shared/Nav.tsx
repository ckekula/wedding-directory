"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "plan it",
    path: "/plan-it",
  },
  {
    name: "about",
    path: "/about",
  },

  {
    name: "contact",
    path: "/contact",
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className=" flex gap-8 font-title">
      {Links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium  transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
