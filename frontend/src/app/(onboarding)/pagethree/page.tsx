'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FaCircleCheck } from "react-icons/fa6";
import { TbCircleNumber3Filled } from "react-icons/tb";
import { GoHorizontalRule } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useAuth } from '@/contexts/VisitorAuthContext';
import { UPDATE_VISITOR } from '@/graphql/mutations';
import CityInput from '@/components/vendor-signup/CityInput';
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';

const OnboardingPageThree = () => {
  const router = useRouter();
  const { visitor } = useAuth(); // Get visitor from the auth context

  const [weddingVenue, setWeddingVenue] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [loading, setLoading] = useState(false);

  const [updateVisitor] = useMutation(UPDATE_VISITOR);

  const handleNext = async () => {
    try {
      setLoading(true); // Set loading to true before submission

      const preparedWeddingVenue = weddingVenue || null;

      await updateVisitor({
        variables: {
          id: visitor?.id,
          input: {
            wed_venue: preparedWeddingVenue,
           
          },
        },
      });

      toast.success("Setup complete! Welcome to your dashboard.");
      router.push("/visitor-dashboard");
    } catch (error) {
      console.error("Error updating visitor: ", error);
      toast.error("Failed to save your information. Please try again.");
      setLoading(false); // Set loading back to false if there's an error
    }
  };
  const handleClose = () => {
    router.push("/visitor-dashboard");
  };

  const handleSkip = () => {
    router.push("/visitor-dashboard");
  };

  return (
    <div className="bg-semiboldYellow font-title min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row h-[800px] w-full md:w-10/12 lg:w-8/12 shadow-lg rounded-lg overflow-hidden md:h-[700px]">
        {/* Left Image Section */}
        <div className="relative w-full md:w-6/12 h-96 md:h-auto">
          <Image
            src="/images/onBoard3.webp"
            layout="fill"
            objectFit="cover"
            alt="onboard image"
          />
        </div>

        {/* Right Form Section */}
        <div className="relative w-full md:w-6/12 p-8 md:p-10 bg-white border-l-2 border-gray-200">
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-black hover:text-gray-500"
            onClick={handleClose}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Back Button */}
          <button
            className="absolute top-5 left-5 text-black font-body hover:text-gray-500"
            onClick={() => router.push("/pagetwo")}
          >
            &larr; Back
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center text-center space-x-2 text-lg mt-8 mb-8">
            <FaCircleCheck />
            <span className="text-base">Get Started</span>
            <GoHorizontalRule className="text-6xl" />
            <FaCircleCheck />
            <span className="text-base">Plan</span>
            <GoHorizontalRule className="text-6xl" />
            <TbCircleNumber3Filled />
            <span className="text-base">Finish Up</span>
          </div>

          {/* Form Heading */}
          <h2 className="text-3xl text-center mb-2 font-semibold">
            Nice! Before we continue, one last thing
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            We&apos;ll help you plan the wedding you want - small or big, near
            or far
          </p>

          {/* Input Fields */}
          <div className="mb-6">
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Where is your hometown? (For better recommendations)
              </label>
              <CityInput
                placeholder="Find your city"
                onCityChange={setWeddingVenue}
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mt-3 mb-2">
                What is your Contact Number (optional)
              </label>
              <Input
                className="h-10 w-full rounded-xl border-2 border-gray-300"
                type="text"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)} // Update state
                placeholder="Contact Number"
              />
            </div>
          </div>

          {/* Let's Go Button */}
          <div className="text-center mt-6">
            <Button
              className="w-full bg-primary hover:bg-primary-dark text-black font-bold rounded-lg h-12"
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                "Let's go"
              )}
            </Button>
          </div>

          {/* Skip Onboarding */}
          <button
            className="mt-10 text-center text-black block w-full"
            onClick={handleSkip}
            disabled={loading}
          >
            Skip the onboarding process
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPageThree;
