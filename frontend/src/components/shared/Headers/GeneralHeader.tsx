"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Fragment, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import Nav from "../Nav";
import VisitorLogin from "@/components/shared/VisitorLogin";
import VisitorSignup from "@/components/shared/VisitorSignup";

const GeneralHeader = () => {
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);
  const pathname = usePathname();

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
        <div className="container mx-auto grid grid-cols-3 items-center">
          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="xl:hidden flex justify-start items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <HiX className="text-3xl" size={30} />
              ) : (
                <HiMenu className="text-3xl" />
              )}
            </button>
          </div>

          {/* Logo Column */}
          <div className="flex justify-center items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-black font-title whitespace-nowrap">
                Say I Do
              </h1>
            </Link>
          </div>

          {/* Navigation Column */}
          <div className="hidden xl:flex justify-center items-center">
            <Nav />
          </div>

          {/* Authentication Buttons Column - Only visible on desktop */}
          <div className="hidden xl:flex justify-end items-center gap-4">
            <Button
              variant="login"
              onClick={() => setLoginVisible(true)}
              className="w-full sm:w-auto"
            >
              Login
            </Button>
            {/* Add the sign up component after the waitlist is over */}
            <Button
              variant="signup"
              className="w-full sm:w-auto"
              onClick={() => setSignupVisible(true)}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Always rendered) */}
        <div className={`${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black z-30 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-40' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Slide-in Menu */}
          <div
            className="fixed inset-y-0 left-0 w-2/4 max-w-sm bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out"
            style={{
              transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="p-6 space-y-4 flex flex-col">
              {/* Navigation Links */}
              {[
                { name: "home", path: "/" },
                { name: "about", path: "/about" },
                { name: "vendors", path: "/vendor-search" },
                { name: "contact", path: "/contact" },
                { name: "help", path: "/help" },
              ].map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    href={link.path}
                    key={index}
                    className={`text-lg font-title capitalize transition-all cursor-pointer ${
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
              
              {/* Authentication Buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  variant="login"
                  onClick={() => {
                    setLoginVisible(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  variant="signup"
                  className="w-full"
                  onClick={() => {
                    setSignupVisible(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Visitor Login and Signup */}
        <VisitorLogin
          isVisible={isLoginVisible}
          onClose={() => setLoginVisible(false)}
        />
        <VisitorSignup
          isVisible={isSignupVisible}
          onClose={() => setSignupVisible(false)}
        />
      </header>
    </Fragment>
  );
};

export default GeneralHeader;