import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Subscribe = () => {
  return (
    <div className="h-auto py-10 md:h-[250px] w-full bg-brown flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-lg px-4 space-y-6 md:space-y-0 md:space-x-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-white text-center md:text-left">
          Get started with &apos;Say I Do&apos;
          <br />
          <span>and plan your wedding</span>
        </h2>
        <Button
          variant="subscribe"
          className="font-body font-bold px-4 py-2 text-[18px] md:text-[20px]"
        >
          <Link href={"#"}>Subscribe</Link>
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
