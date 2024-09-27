import React from "react";
import { Button } from "../ui/button";

const Subscribe = () => {
  return (
    <div className=" h-[250px] w-auto bg-brown flex justify-center items-center">
      <div className="flex justify-between items-center w-full max-w-screen-lg px-4 ">
        <h2 className="text-5xl font-bold font-title text-white">
          Get started with &apos;Say I Do&apos;
          <br />
          <span>and plan your wedding </span>
        </h2>
        <Button
          variant="subscribe"
          className="font-body  font-bold px-4 text-[20px]"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
