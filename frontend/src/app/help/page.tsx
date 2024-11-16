import React from "react";
import Image from "next/image";
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

const Help = () => {
  return (
    <div className="bg-lightYellow font-body">
      <Header />
      <div className="mx-4 md:mx-10">
        {/* Image Section */}
        <div className="relative z-10 w-full md:w-10/12 h-72 md:h-96 mx-auto flex justify-center items-center">
          <div className="absolute inset-0 border-solid rounded-md overflow-hidden">
            <Image
              src="/images/photography.webp"
              layout="fill"
              objectFit="cover"
              alt="sign image"
            />
          </div>
        </div>

        {/* Help Content Section */}
        <div className="mt-4 bg-white rounded-lg py-5 px-4 md:px-6 mx-2 md:mx-auto md:w-10/12 lg:w-8/12">
          <div className="font-title font-bold text-2xl md:text-3xl mb-4">
            Help
          </div>
          <div className="mb-4 text-sm md:text-base">
            Explain the issue you are experiencing or ask us a question.
          </div>
          <div className="mb-4 text-sm md:text-base">
            Our standard business hours are Monday through Friday 9:00 a.m. to
            6:00 p.m. EST. We will respond to your request as quickly as
            possible!
          </div>
          <Link
            className="font-bold text-orange hover:underline"
            href="/contact-us"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
