"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sanduni & Tharindu",
    location: "Hapugala, Galle",
    text: "Our wedding day was everything we dreamed of, and it was all thanks to the amazing vendors we found through Say I Do. The process was seamless, and we were able to find everything we needed in one place. Highly recommended!",
    image: "/images/testimonial.webp",
  },
  {
    id: 2,
    name: "Sandun & Imasha",
    location: "Peradeniya, Kandy",
    text: "From the moment we started planning until the last dance at our reception, Say I Do was there for us. Their tools made budgeting and organizing stress-free, allowing us to enjoy every moment leading up to the big day.",
    image: "/images/testimonial.webp",
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="flex justify-center py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-title text-center mb-7">
          What other couples say about us
        </h2>
        <div className="flex items-center justify-center w-full">
          <FaCaretLeft
            onClick={prevTestimonial}
            className="cursor-pointer hover:text-gray-700 mx-2 md:mx-10"
            size={25}
          />
          <div className="relative flex flex-col md:flex-row items-center justify-center w-full md:w-auto p-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-6 border rounded-lg shadow-lg">
              <Image
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-28 h-28 md:w-48 md:h-48 rounded-full"
                width={200}
                height={200}
              />
              <div className="flex flex-col text-center md:text-left ">
                <p className="text-sm md:text-base font-body px-2 md:px-4 pb-4">
                  {testimonials[currentTestimonial].text}
                </p>
                <h3 className="text-xl md:text-2xl px-2 font-montez">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-sm font-body font-bold px-2">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>
          </div>
          <FaCaretRight
            onClick={nextTestimonial}
            className="cursor-pointer hover:text-gray-700 mx-2 md:mx-10"
            size={25}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
