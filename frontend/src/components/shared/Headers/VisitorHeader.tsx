"use client";
import Link from "next/link";
import { Fragment } from "react";
import { Input } from "@/components/ui/input";
import SearchBar from "../SearchBar";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import profile from "../../../assets/images/profilePic.jpg";

const VisitorHeader = () => {
  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white">
        <div className="container mx-auto flex  justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className=" text-2xl font-bold text-text font-title">
                Say I Do
              </h1>
            </Link>
          </div>

          {/*search bar/*/}
          <div className="flex flex-1 justify-center">
            <SearchBar
              showIcon={false}
              placehHolderText="search venues, caterers, etc."
            />
          </div>

          {/*dashboard nav */}
          <div className="flex items-center justify-end gap-8 text-xl font-title text-text">
            <Link href="/visitor-dashboard">Dashboard</Link>
            <Link href="/help">Help</Link>
            <Link href="/notifications">
              <IoIosNotificationsOutline className="w-[36px] h-[36px]" />
            </Link>
            <Link href="/visitor-profile">
              <Image
                src={profile}
                alt="profile picture"
                className="w-[50px] h-[50px] rounded-full"
              />
            </Link>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default VisitorHeader;
