import React from "react";
import Link from "next/link";

const Settings = () => {
  return (
    <div className="container bg-white w-[280px] h-[265px] justify-center shadow-md rounded-2xl">
      <h2 className="font-title font-bold text-[32px] pt-4">Settings</h2>
      <hr className="w-[131px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
      <div className="flex flex-col gap-4 font-title text-[20px]">
        <Link href="/profile">Profile</Link>
        <Link href="/notifications">Notifications</Link>
        <Link href="/account">Account</Link>
      </div>
    </div>
  );
};

export default Settings;
