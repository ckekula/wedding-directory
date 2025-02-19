import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { OfferingProps } from "../../types/offeringTypes";
import Link from "next/link";

const OfferingCard: React.FC<OfferingProps> = ({
  name,
  vendor,
  city,
  rating,
  banner,
  link,
  buttonText,
}) => {

  return (
    <div className="bg-white flex justify-left items-start mb-5 border rounded-2xl shadow-lg hover:shadow-xl">
      <div className="flex flex-col w-full">
        <Image
          src={banner}
          alt="vendor-banner"
          className="w-full h-full object-cover rounded-xl"
          layout="responsive"
          width={600}
          height={500}
          priority
        />
        <div className="p-4">
          <div className="">
            <div className="text-md font-semibold">{vendor}</div>
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="text-md">{city}</div>
          </div>
          <div className="flex flex-row mb-4">
            <p className="text-yellow-400 mr-1">★★★★★</p>
            <p className="">{rating}</p>
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

export default OfferingCard;
