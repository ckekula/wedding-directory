import React from "react";
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";
import Carousel from "@/components/about-us/Carousel";
import AboutUsSection from "@/components/about-us/AboutUsSection";
import PurposeAndVision from "@/components/about-us/PurposeAndVision";

const AboutUsPage: React.FC = () => {
  const images = [
    "/Carousel_1.jpg",
    "/Carousel_2.jpg",
    "/Carousel_3.jpg",
    "/Carousel_4.jpg",
    "/Carousel_5.jpg",
  ]; // Add your images here

  return (
    <div className="bg-lightYellow font-body ">
      <Header />

      <div className="mx-10">
        {/* Carousel Section */}
        <div className="w-full h-[500px] md:h-[400px] mx-auto flex justify-center items-center">
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
