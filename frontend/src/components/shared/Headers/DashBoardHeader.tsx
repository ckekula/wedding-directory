"use client";
import Link from "next/link";
import { Fragment } from "react";
import { Input } from "@/components/ui/input";

const DashBoardHeader = () => {
  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white">
        <div className="container mx-auto flex justify-between items-center ">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/">
              <h1 className=" text-2xl font-bold text-black font-title">
                Say I Do
              </h1>
            </Link>
          </div>

          {/*search bar/*/}
          
        </div>
      </header>
    </Fragment>
  );
};

export default DashBoardHeader;
