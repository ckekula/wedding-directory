import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { Button } from "../ui/button";
import { OfferingProps } from "../../types/offeringTypes";
import Link from "next/link";

// Utility function to truncate the description
const truncateDescription = (description: string, maxLength: number) => {
  if (!description) return ""
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + "...";
  }
  return description;
};

// VendorResult component definition
const VendorResult = ({
  name,
  vendor,
  city,
  rating,
  price,
  about,
  banner,
  showStats,
  link,
  buttonText,
}: OfferingProps) => {
  // Truncate the description to a maximum of 100 characters
  const truncatedDescription = truncateDescription(about, 100);

  return (
    <div className="flex justify-left items-start mb-5 border rounded-2xl shadow-lg hover:shadow-xl">
      <div className="flex flex-col w-full">
        <Image
          src={banner}
          alt="vendor-banner"
          className="w-full h-full object-cover rounded-xl"
          layout="responsive"
          width={600}
          height={500}
        />
        <div className="p-4">
          <div className="flex flex-row mb-4">
            <div className="w-5/6">
              <div className="text-md font-semibold">{vendor}</div>
              <h3 className="text-xl font-bold">{name}</h3>
              <div className="text-md">{city}</div>
            </div>
            {showStats && (
              <div className="w-1/6 text-3xl flex flex-col items-center">
                <CiHeart />
                <p className="text-xs mt-2">{price}</p>
                <p className="text-xs">{rating}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div>
              {truncatedDescription}{" "}
              {about && about.length > 100 && (
                <Link href={link} className="text-blue-500">
                  Read more
                </Link>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <Link href={link} className="w-full">
              <Button variant="signup" className="w-full">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorResult;
