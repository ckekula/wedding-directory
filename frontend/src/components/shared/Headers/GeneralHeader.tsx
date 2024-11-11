"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Fragment, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/VisitorAuthContext";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Nav from "../Nav";

const GeneralHeader = () => {
  const { isAuthenticated, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  // Close the profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white relative">
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <HiX className="text-3xl" size={30} />
              ) : (
                <HiMenu className="text-3xl" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-black font-title ml-2">
                Say I Do
              </h1>
            </Link>
          </div>

          {/* Desktop Nav (visible on larger screens) */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-8">
            <Nav />
          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-4">
            <Button
              className="sm:hidden"
              variant="login"
              onClick={() => router.push("/visitor-login")}
            >
              Login
            </Button>
            <Button
              variant="signup"
              onClick={() => router.push("/visitor-signup")}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Overlay and Mobile Menu */}
        {isMobileMenuOpen && (
          <div>
            {/* Overlay to blur the background */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Slide-in Mobile Menu */}
            <div
              className="fixed inset-y-0 left-0 w-2/4 max-w-sm bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out"
              style={{
                transform: isMobileMenuOpen
                  ? "translateX(0)"
                  : "translateX(-100%)",
              }}
            >
              <div className="p-6 space-y-4 flex flex-col">
                {[
                  { name: "home", path: "/" },
                  { name: "about", path: "/about" },
                  { name: "contact", path: "/contact" },
                  { name: "help", path: "/help" },
                ].map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      href={link.path}
                      key={index}
                      className={`text-lg font-title capitalize transition-all ${
                        isActive
                          ? "font-bold text-black"
                          : "text-black hover:text-orange "
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default GeneralHeader;
