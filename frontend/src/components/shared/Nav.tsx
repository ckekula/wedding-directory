"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "blog",
    path: "/blog",
  },
  {
    name: "vendors",
    path: "/vendor-search",
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
    <nav className=" flex gap-6 font-title   text-xl">
      {Links.map((link, index) => {
        const isActive = pathname === link.path;
        return (
          <Link
            href={link.path}
            key={index}
            className={`
              capitalize 
              text-black 
              hover:text-orange  
              transition-all 
              ${isActive ? "font-bold text-black" : ""}
              ${isActive && "hover:text-orange hover:font-bold"} 
            `}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
