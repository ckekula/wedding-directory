"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { MoveRight, MoveLeft } from "lucide-react";

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
      <div className="container mx-auto my-auto ">
        <h2 className="text-5xl font-bold font-title text-center mb-7">
          What other couples say about us
        </h2>
        <div className=" flex items-center justify-center w-auto">
          <MoveLeft
            onClick={prevTestimonial}
            className=" cursor-pointer hover:text-gray-700 mx-10"
            size={30}
          />
          <div className="relative flex items-center justify-center">
            <div className="flex items-center space-x-4 p-6 border rounded-lg shadow-lg">
              <Image
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className=" ml-10"
                width={200}
                height={200}
              />
              <div className="flex flex-col">
                <p className="text-m font-body ml-10 pl-4 pb-4 pr-4">
                  {testimonials[currentTestimonial].text}
                </p>
                <h3 className="text-2xl  ml-10 pl-4  font-montez">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-sm font-body font-bold ml-10 pl-4">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>
          </div>
          <MoveRight
            onClick={nextTestimonial}
            className="cursor-pointer hover:text-gray-700 mx-10"
            size={30}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
