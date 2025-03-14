import React from "react";
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";
import Carousel from "@/components/about-us/Carousel";
import AboutUsSection from "@/components/about-us/AboutUsSection";
import PurposeAndVision from "@/components/about-us/PurposeAndVision";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
}

const AboutUsPage: React.FC = () => {
  const images = [
    "/images/Carousel_1.webp",
    "/images/Carousel_2.webp",
    "/images/Carousel_3.webp",
    "/images/Carousel_4.webp",
    "/images/Carousel_5.webp",
  ];

  return (
    <div className="bg-lightYellow font-body ">
      <Header />

      <div className="mx-10">
        {/* Carousel Section */}
        <div className="hidden sm:flex w-full h-[500px] md:h-[400px] mx-auto justify-center items-center">
          <Carousel images={images} />
        </div>

        <div className="mt-10">
          <AboutUsSection />
        </div>

        {/* Purpose and Vision */}
        <div >
          <PurposeAndVision />
        </div>

        
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;


