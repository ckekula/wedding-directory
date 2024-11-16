"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Fragment, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import Nav from "../Nav";
import VisitorLogin from "@/components/shared/VisitorLogin";
import VisitorSignup from "@/components/shared/VisitorSignup";

const GeneralHeader = () => {
  const { isAuthenticated, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);
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
        <div className="container mx-auto grid grid-cols-3 items-center">
          {/* Logo Column */}
          <div className="flex justify-start items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-black font-title ml-2">
                Say I Do
              </h1>
            </Link>
          </div>
  
          {/* Navigation Column */}
          <div className="hidden xl:flex justify-center items-center">
            <Nav />
          </div>
  
          {/* Authentication Buttons Column */}
          <div className="flex justify-end items-center gap-4">
            <Button
              variant="login"
              onClick={() => setLoginVisible(true)}
            >
              Login
            </Button>
            <Button
              variant="signup"
              data-tally-open="wv0AKQ"
              data-tally-width="752"
              data-tally-layout="modal"
              data-tally-auto-close="0"
            >
              Get Started
            </Button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        <div className="xl:hidden flex justify-between items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <HiX className="text-3xl" size={30} />
            ) : (
              <HiMenu className="text-3xl" />
            )}
          </button>
        </div>
  
        {isMobileMenuOpen && (
          <div>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
  
            {/* Slide-in Menu */}
            <div
              className="fixed inset-y-0 left-0 w-2/4 max-w-sm bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out"
              style={{
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
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
