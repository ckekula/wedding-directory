import React from "react";
import VendorResult from "../vendor-search/VendorResult"; // Reuse VendorResult
import Link from "next/link";

interface ServiceResultProps {
  vendor: string;
  f_name: string;
  city: string;
  rating: string;
  price: string;
  banner: string;
  description: string;
  packages: { category: string; name: string }[];
}

const truncateDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + "...";
  }
  return description;
};

const ServiceResult: React.FC<ServiceResultProps> = ({
  f_name = "Unknown",  // Accept f_name as a prop
  vendor = "Unknown Vendor",
  city = "Unknown City",
  rating = "No Rating",
  price = "Price not available",
  banner = "/banner.jpg", // Default banner image
  description = " No description available",
  packages = [{ category: "Unknown", name: "Unknown Service" }],
}) => {
  const truncatedDescription = truncateDescription(description, 100); // Truncate to 100 characters

  const about = (
    <>
      {truncatedDescription}{" "}
      {description.length > 100 && (
        <Link href="/vendor-public-profile" className="text-blue-500">
          Read more
        </Link>
      )}
    </>
  );

  return (
    <VendorResult
      f_name={f_name} // Pass f_name separately
      vendor={vendor}
      city={city}
      rating={rating}
      price={price}
      banner={banner}
      about={about} // No need to convert to string
      showHeartIcon={false} // Remove heart icon
      buttonText="View Service" // Change button text
      link="/vendor-profile-page" // Link to vendor profile page
    />
  );
};


export default ServiceResult;
