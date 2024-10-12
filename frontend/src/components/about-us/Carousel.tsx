"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full container h-[500px] md:h-[400px] mt-20 ">
      {/* Display the current image */}
      <Image
        src={images[currentIndex]}
        layout="fill"
        objectFit="cover"
        alt={`Carousel image ${currentIndex + 1}`}
        className='rounded-2xl shadow-xl'
      />

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full"
      >
        <MdArrowBackIos size={40} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2  text-white p-3 rounded-full"
      >
        <MdArrowForwardIos size={40}/>
      </button>
    </div>
  );
};

export default Carousel;
