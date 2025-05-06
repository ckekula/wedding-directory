import React from "react";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface OfferingProps {
  name: string;
  vendor: string;
  city: string;
  rating: number;
  banner: string;
  link: string;
  buttonText: string;
}

const OfferingCard: React.FC<OfferingProps> = ({
  name,
  vendor,
  city,
  rating,
  banner,
  link,
  buttonText,
}) => {
  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-star-${i}`} className="text-yellow-400" />
      );
    }

    return stars;
  };

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
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-gray-600">{vendor}</p>
            <p className="text-gray-500 text-sm">{city}</p>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-sm text-gray-600 ml-1">
              ({rating.toFixed(1)})
            </span>
          </div>
          
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
