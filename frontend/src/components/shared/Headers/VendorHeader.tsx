"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import profile from "../../../assets/images/profilePic.jpg";

const VendorHeader = () => {
  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left section: Logo and "Vendors" text */}
          <div className="flex items-start justify-start flex-1"> {/* Updated to align to the left */}
            <Link href="/">
              <h1 className="text-2xl font-bold text-text font-title">Say I Do</h1>
              <p className="text-sm font-title text-center">Vendors</p> {/* Set text to align left */}
            </Link>
          </div>

          {/* Center section: Navigation links */}
          <div className="flex-1 flex justify-center items-center gap-8 text-xl font-title text-text"> {/* Ensure this is centered */}
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard">Services</Link>
            <Link href="/dashboard">Analytics</Link>
            <Link href="/dashboard">Help</Link>
            <Link href="/dashboard">Settings</Link>
          </div>

          {/* Right section: Notification and Profile Icon */}
          <div className="flex items-center justify-end gap-8 flex-1"> {/* Updated to align to the right */}
            <IoIosNotificationsOutline className="w-[36px] h-[36px]" />
            <Image
              src={profile}
              alt="vendor-profile-image"
              className="rounded-full border border-gray-300 cursor-pointer"
              width={50}
              height={50}
            />
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default VendorHeader;
