"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  { name: "Home", path: "/" },
  { name: "Plan it", path: "/plan-it" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Help", path: "/help" },
];
const Header = () => {
  const pathname = usePathname();

  return <header>
    <nav className="flex gap-8">
    {Links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  </header>;
};

export default Header;
