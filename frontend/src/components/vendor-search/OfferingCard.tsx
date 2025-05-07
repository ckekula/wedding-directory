import React from "react";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface OfferingProps {
  name: string;
  vendor: string;
  city: string;
  rating?: number; // make rating optional
  banner: string;
  link: string;
  buttonText: string;
}

const OfferingCard: React.FC<OfferingProps> = ({
  name,
  vendor,
  city,
  rating = 0, // provide default value
  banner,
  link,
  buttonText,
}) => {
  // Generate star rating display
  const renderStars = (rating: number) => {
    const safeRating = Number(rating) || 0; // ensure rating is a number
    const stars = [];
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(safeRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-star-${i}`} className="text-yellow-400" />
      );
    }

    return stars;
  };

  // Convert rating to number and handle invalid values
  const numericRating = Number(rating) || 0;

  return (
    <div className="flex justify-left bg-white items-start mb-5 border rounded-2xl shadow-lg hover:shadow-xl">
      <div className="flex flex-col w-full p-3">
        <div className="relative w-full h-48 mb-3">
          <Image
            src={banner}
            alt={name}
            className="rounded-lg object-cover"
            fill
            priority
          />
        </div>
        <div className="flex flex-col mb-2">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <div className="flex items-center gap-1 mb-1">
            {renderStars(numericRating)}
            <span className="text-sm text-gray-600 ml-1">
              ({numericRating.toFixed(1)})
            </span>
          </div>
          <p className="text-gray-600">{vendor}</p>
          <p className="text-gray-500 text-sm">{city}</p>
        </div>
        
        <Link 
          href={link}
          className="mt-2 w-full bg-orange text-white py-2 px-4 rounded-lg 
                     text-center hover:bg-orange-600 transition-colors duration-200"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default OfferingCard;
