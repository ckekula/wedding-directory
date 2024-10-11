"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const WeddingPlanningGuide: React.FC = () => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-xl text-center w-full">
      <h3 className="font-title text-4xl font-semibold">
        Have no idea about how to plan your wedding?
      </h3>
      <p className="text-l font-body my-2">We are here to help you for every little step of yours!</p>
      <Button variant="signup">Say I Do Guidance</Button>
    </div>
  );
};

export default WeddingPlanningGuide;
