"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import { useVendorAuth } from "@/contexts/VendorAuthContext"; // Added vendor auth context
import { BiMessageRounded } from "react-icons/bi";

const VendorHeader = () => {
  const { logout } = useVendorAuth(); // Added logout function from vendor auth context
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State for the profile dropdown
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Handle dropdown toggle
  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
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

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left section: Logo */}
          <div className="flex items-start justify-start flex-1">
            <Link href="/">
              <h1 className="text-2xl font-bold text-text font-title">
                Say I Do
              </h1>
              <p className="text-sm font-title text-center">Vendors</p>
            </Link>
          </div>

          {/* Center section: Navigation */}
          <div className="flex-1 flex justify-center items-center gap-8 text-xl font-title text-text">
            <Link href="/vendor-dashboard">Dashboard</Link>
            <Link href="/vendor-dashboard/payments">Payments</Link>
            <Link href="/vendor-search">Vendors</Link>
            <Link href="/vendor-dashboard/settings">Settings</Link>
            <Link href="/help">Help</Link>
          </div>

          {/* Right section: Notifications and Profile dropdown */}
          <div className="flex items-center justify-end gap-8 flex-1">
            {/*Update the message icon section*/}
            <Link href="/vendor-dashboard/chats">
              <BiMessageRounded className="w-[33px] h-[33px] cursor-pointer hover:text-gray-600" />
            </Link>
            <IoIosNotificationsOutline className="w-[36px] h-[36px]" />
            {/* Profile dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <Image
                src="/images/visitorPlaceholder.png"
                alt="vendor-profile-image"
                className="rounded-full cursor-pointer"
                width={50}
                height={50}
                onClick={handleProfileClick}
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  <p
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-title text-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default VendorHeader;
