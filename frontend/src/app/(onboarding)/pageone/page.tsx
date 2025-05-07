'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TbCircleNumber1Filled, TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb";
import { GoHorizontalRule } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/VisitorAuthContext';
import { useMutation } from '@apollo/client';
import { UPDATE_VISITOR } from '@/graphql/mutations';
import { Loader2 } from 'lucide-react';

const OnboardingPageOne = () => {
  const { visitor } = useAuth(); // get visitor info from auth context
  const router = useRouter();

  // Form state
  const [visitorFname, setVisitorFname] = useState("");
  const [visitorLname, setVisitorLname] = useState("");
  const [partnerFname, setPartnerFname] = useState("");
  const [partnerLname, setPartnerLname] = useState("");
  const [loading, setLoading] = useState(false);

  // Apollo mutation hook to update visitor information
  const [updateVisitor] = useMutation(UPDATE_VISITOR);

  // Handle close
  const handleClose = () => {
    router.push("/visitor-dashboard");
  };

  // Handle skip
  const handleSkip = () => {
    router.push("/visitor-dashboard");
  };

  // Handle next button click
  const handleNext = async () => {
    try {
      setLoading(true);
      // Call mutation to update visitor's name information
      await updateVisitor({
        variables: {
          id: visitor?.id,  // Use the visitor ID from context
          input: {
            visitor_fname: visitorFname,
            visitor_lname: visitorLname,
            partner_fname: partnerFname,
            partner_lname: partnerLname
          }
        }
      });
      // Navigate to the next onboarding page
      router.push("/pagetwo");
    } catch (error) {
      console.error("Error updating visitor:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-bofont-semiboldYellow font-title min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row h-[800px] w-full md:w-10/12 lg:w-8/12 shadow-lg rounded-lg overflow-hidden md:h-[700px]">
        {/* Left Image Section */}
        <div className="relative w-full md:w-6/12 h-96 md:h-auto">
          <Image
            src="/images/onBoard1.webp"
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

          {/* Progress Indicator */}
          <div className="flex items-center justify-center text-center space-x-2 text-lg mt-8 mb-8">
            <TbCircleNumber1Filled />
            <span className="text-base">Get Started</span>
            <GoHorizontalRule className="text-6xl" />
            <TbCircleNumber2 />
            <span className="text-base">Plan</span>
            <GoHorizontalRule className="text-6xl" />
            <TbCircleNumber3 />
            <span className="text-base">Finish Up</span>
          </div>

          {/* Form Heading */}
          <h2 className="text-3xl text-center mb-8 font-semibold">
            Like any great relationship, this one starts with basics
          </h2>

          {/* Input Fields */}
          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold mb-2">First name</label>
              <Input
                className="h-10 w-full rounded-xl border-2 border-gray-300"
                type="text"
                value={visitorFname}
                onChange={(e) => setVisitorFname(e.target.value)} // Update state
                placeholder=""
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold mb-2">Last name</label>
              <Input
                className="h-10 w-full rounded-xl border-2 border-gray-300"
                type="text"
                value={visitorLname}
                onChange={(e) => setVisitorLname(e.target.value)} // Update state
                placeholder=""
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold mb-2">
                Partner&apos;s first name
              </label>
              <Input
                className="h-10 w-full rounded-xl border-2 border-gray-300"
                type="text"
                value={partnerFname}
                onChange={(e) => setPartnerFname(e.target.value)} // Update state
                placeholder=""
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold mb-2">
                Partner&apos;s last name
              </label>
              <Input
                className="h-10 w-full rounded-xl border-2 border-gray-300"
                type="text"
                value={partnerLname}
                onChange={(e) => setPartnerLname(e.target.value)} // Update state
                placeholder=""
              />
            </div>
          </div>

          {/* Next Button */}
          <div className="text-center mt-6">
            <Button
              className="w-full bg-primary hover:bg-primary-dark text-black font-bold rounded-lg h-12"
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Next"
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

export default OnboardingPageOne;
