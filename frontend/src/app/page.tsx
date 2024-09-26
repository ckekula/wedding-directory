import React from "react";
import { Metadata } from "next";

//components
import Header from "@/components/shared/Headers/Header";
import Hero from "@/components/home/Hero";
import MasonaryGrid from "@/components/home/MasonaryGrid";
import PlanningSteps from "@/components/home/PlanningSteps";
import Testimonials from "@/components/home/Testimonials";
import Subscribe from "@/components/home/Subscribe";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: 'Say I Do',
}

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
