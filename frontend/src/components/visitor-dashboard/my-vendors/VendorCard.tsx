import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface VendorCardProps {
  name: string;
  vendor: string;
  city: string;
  banner: string;
  link: string;
}

const VendorCard = ({ name, vendor, city, banner, link }: VendorCardProps) => {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white w-full">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={banner}
          alt={`${name} banner`}
          className="object-cover rounded-lg"
          fill
          sizes="(max-width: 96px) 100vw, 96px"
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <p className="text-sm text-gray-600 truncate">{vendor}</p>
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <p className="text-sm text-gray-500 truncate">{city}</p>
      </div>
      
      <Link href={link} className="flex-shrink-0">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          View
        </Button>
      </Link>
    </div>
  );
};

export default VendorCard;