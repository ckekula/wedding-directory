import React from "react";

//components
import Header from "@/components/shared/Header";
import Hero from "@/components/Hero";
import MasonaryGrid from "@/components/MasonaryGrid";
import VendorCategories from "@/components/VendorCategories";
import PlanningSteps from "@/components/PlanningSteps";
import Testimonials from "@/components/Testimonials";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/shared/Footer";

export default function Page() {
  return (
    <div>
      <Header />
      <Hero />
      <MasonaryGrid />
      <PlanningSteps />
      <Testimonials />
      <Subscribe />
      <Footer />
    </div>
  );
}
