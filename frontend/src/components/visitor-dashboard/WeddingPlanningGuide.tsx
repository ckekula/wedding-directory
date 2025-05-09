"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";

const WeddingPlanningGuide: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleButtonClick = () => {
    router.push("/help"); // Navigate to the help page
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl text-center w-full">
      <h3 className="font-title text-4xl font-semibold">
        Have no idea about how to plan your wedding?
      </h3>
      <p className="text-l font-body my-2">We are here to help you for every little step of yours!</p>
      <Button variant="signup" onClick={handleButtonClick}>
        Say I Do Guidance
      </Button>
    </div>
  );
};

export default WeddingPlanningGuide;