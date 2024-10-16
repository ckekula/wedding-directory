"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Fragment, useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/VisitorAuthContext";

//components
import Nav from "../Nav";
import VisitorSignup from "../VisitorSignup";
import VisitorLogin from "../VisitorLogin";
import Image from "next/image";

const GeneralHeader = () => {
  const [showVisitorSignup, setShowVisitorSignup] = useState(false);
  const [showVisitorLogin, setShowVisitorLogin] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null); // Ref for the profile menu

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false); // Close the menu after logging out
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false); // Close the menu
      }
    };

    // Add event listener when dropdown is open
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount or when dropdown is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/">
              <h1 className="text-2xl font-bold text-black font-title">
                Say I Do
              </h1>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="flex-1 hidden xl:flex items-center justify-center">
            <Nav />
          </div>

          {/* Conditional rendering for authentication */}
          <div className="flex-1 flex items-center justify-end gap-7 text-xl">
            {isAuthenticated ? (
              // If authenticated, show profile picture or icon
              <div className="relative" ref={profileMenuRef}>
                <Image
                  src='images/profilePic.jpg'
                  alt="profile picture"
                  className=" rounded-full border border-gray-300 cursor-pointer" // Circle styling
                  onClick={handleProfileClick}
                  width={50}
                  height={50}
                ></Image>
                {/* Profile dropdown */}
                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
                    style={{ zIndex: 50 }} // Ensure dropdown appears on top
                  >
                    <Link href="/dashboard">
                      <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-title text-lg">
                        Dashboard
                      </p>
                    </Link>
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-title text-lg"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // If not authenticated, show Login and Get Started buttons
              <div className="flex-1 flex items-center justify-end gap-8 text-xl">
                <Button
                  variant="login"
                  onClick={() => setShowVisitorLogin(true)}
                >
                  Login
                </Button>
                <Button
                  variant="signup"
                  onClick={() => setShowVisitorSignup(true)}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals for Signup and Login */}
      <VisitorSignup
        isVisible={showVisitorSignup}
        onClose={() => setShowVisitorSignup(false)}
      />
      <VisitorLogin
        isVisible={showVisitorLogin}
        onClose={() => setShowVisitorLogin(false)}
      />
    </Fragment>
  );
};

export default GeneralHeader;
