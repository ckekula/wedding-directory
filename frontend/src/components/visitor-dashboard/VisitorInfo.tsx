"use client";
import React from "react";
import Link from "next/link";

interface VisitorInfoProps {
  visitor_fname?: string;
  partner_fname?: string;
  wed_date?: string;
  wed_venue?: string;
}

const VisitorInfo: React.FC<VisitorInfoProps> = ({
  visitor_fname = "Visitor",
  partner_fname = "Partner",
  wed_date = "Add Date",
  wed_venue = "Add Venue",
}) => {
  return (
    <div className="flex flex-col text-center font-merriweather w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="block text-5xl font-bold">{visitor_fname || "You"}</span>
          <span className="block text-4xl font-bold">&</span>
          <span className="block text-5xl font-bold ml-20">
            {partner_fname  || "Yours"}
          </span>
        </div>

        <div className="flex flex-col items-center text-center whitespace-nowrap justify-center">
          <p className="font-title text-4xl font-semibold">Plan your wedding</p>
          <p className="font-body text-lg">All in one place</p>
        </div>
      </div>
      <div className="flex m-2 justify-center gap-8 font-body">
        <Link href="#">{wed_date || "Add Date"} </Link>
        <Link href="#">{wed_venue || "Add Venue"}</Link>
        <Link href="#">No. of Guests</Link>
      </div>
    </div>
  );
};

export default VisitorInfo;
