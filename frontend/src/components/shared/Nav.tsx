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
  {
    name: "help",
    path: "/help",
  }
];


const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className=" flex gap-6 font-title  text-xl">
      {Links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-black border-b-2 border-black"
            } capitalize  hover:  transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
