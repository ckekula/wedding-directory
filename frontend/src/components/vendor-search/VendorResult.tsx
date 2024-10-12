import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { Button } from "../ui/button";
import { PackageProps } from "@/types/packageTypes";
import Link from "next/link";

// Modify the type of `about` to accept `React.ReactNode`
const VendorResult = ({
  f_name = "Unknown",
  vendor = "Unknown Vendor",
  city = "Unknown City",
  rating = "No Rating",
  price = "Price not available",
  about,
  banner = "/banner.jpg",
  showHeartIcon = true,
  buttonText = "Send Message",
  link = "#",
}: PackageProps & {
  f_name?: string; // New f_name prop
  showHeartIcon?: boolean;
  buttonText?: string;
  link?: string;
}) => {
  return (
    <div>
      <div className="flex">
        <div className="flex justify-left items-start mb-5 border rounded-2xl shadow-lg hover:shadow-xl cursor-pointer m-0 p-0">
          <div className="flex flex-col p-0 m-0 ">
            <Image
              src={banner}
              alt="vendor-banner"
              className="w-full h-full object-cover rounded-xl"
              layout="responsive"
              width={600}
              height={500}
            />
            <div className="p-2 mx-2 ">
              <div className="flex flex-row mb-2">
                <div className="w-5/6">
                  {/* Display vendor's first name separately */}
                  <div className="text-md font-semibold">{f_name}</div>
                  <h3 className="text-xl font-bold">{vendor}</h3>
                  <div className="text-md">{city}</div>
                  <div className="text-md">{rating}</div>
                </div>
                {showHeartIcon && (
                  <div className="w-1/6 text-3xl flex flex-col items-center">
                    <CiHeart />
                    <p className="text-xs mt-2">{price}</p>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <div>{about}</div>
              </div>
              <div className="flex justify-center  items-center h-full w-full">
                <Link href={link} className="w-full">
                  {/* Add w-full to make the button full width */}
                  <Button variant="signup" className="w-full">
                    {buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorResult;
