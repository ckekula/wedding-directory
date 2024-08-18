import React from "react";
import { Metadata } from "next";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo/client";

//components
import Header from "@/components/shared/Header";
import Hero from "@/components/Hero";
import MasonaryGrid from "@/components/MasonaryGrid";
import PlanningSteps from "@/components/PlanningSteps";
import Testimonials from "@/components/Testimonials";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/shared/Footer";


export const metadata: Metadata = {
  title: 'Say I Do',
}
export default function Page() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Hero />
        <MasonaryGrid />
        <PlanningSteps />
        <Testimonials />
        <Subscribe />
        <Footer />
      </div>
    </ApolloProvider>

  );
}
