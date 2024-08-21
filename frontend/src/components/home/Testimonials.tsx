"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button"; 
import { MoveRight, MoveLeft } from "lucide-react"; 

const testimonials = [
  {
    id: 1,
    name: "Him & Her",
    location: "wedding location",
    text: "sample text sample text sample text sample text sample text sample text sample sample text sample text sample text",
    image: "/testimonial.png",
  },
  {
    id: 2,
    name: "Couple 2",
    location: "location 2",
    text: "sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text",
    image: "/testimonial.png",
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
      <div className="container mx-auto ">
        <h2 className="text-5xl font-bold font-title text-center mb-8">
          What other couples say about us
        </h2>
        <div className=" flex items-center justify-center w-auto">
        <MoveLeft
            onClick={prevTestimonial}
            className=" cursor-pointer hover:text-gray-700 mx-10"
            size={30}
          />
        <div className="relative flex items-center justify-center">
        
          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-lg">
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
              <h3 className="text-lg  ml-10 pl-4 mt-8 font-montez">
                {testimonials[currentTestimonial].name}
              </h3>
              <p className="text-sm font-body font-bold ml-10 pl-4">{testimonials[currentTestimonial].location}</p>
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
