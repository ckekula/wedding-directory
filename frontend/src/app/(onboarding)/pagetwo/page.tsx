'use client'

import React from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { FaCircleCheck } from "react-icons/fa6";
import { TbCircleNumber2Filled, TbCircleNumber3 } from "react-icons/tb";
import { GoHorizontalRule } from "react-icons/go";
import { useRouter } from 'next/navigation';

const pageTwo = () => {

    const router = useRouter();

    const handleClose = () => {
        router.push("/visitor-dashboard")
    }

    const handleSkip = () => {
        router.push("/visitor-dashboard")
    }

    const handleNext = () => {
        router.push("/pagethree")
    }

    return (
      <div className="bg-lightYellow font-title min-h-screen flex items-center justify-center">
          <div className="flex flex-col md:flex-row h-[800px] w-full md:w-10/12 lg:w-8/12 shadow-lg rounded-lg overflow-hidden">

              {/* Left Image Section */}
              <div className="relative w-full md:w-6/12 h-96 md:h-auto">
                  <Image
                    src="/onboard2.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="onboard image"
                  />
              </div>

              {/* Right Form Section */}
              <div className="relative w-full md:w-6/12 p-8 md:p-10 bg-white border-l-2 border-gray-200">

                  {/* Close Button */}
                  <button className="absolute top-5 right-5 text-black hover:text-gray-500" onClick={handleClose}>
                      <X className="w-6 h-6" />
                  </button>

                  {/* Back Button */}
                  <button className="absolute top-5 left-5 text-black font-body hover:text-gray-500" onClick={() => router.push("/pageone")}>
                      &larr; Back
                  </button>

                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center text-center space-x-2 text-lg mt-8 mb-8">
                      <FaCircleCheck />
                      <span className='text-base'>Get Started</span>
                      <GoHorizontalRule className='text-6xl' />
                      <TbCircleNumber2Filled />
                      <span className='text-base'>Plan</span>
                      <GoHorizontalRule className='text-6xl' />
                      <TbCircleNumber3 />
                      <span className='text-base'>Finish Up</span>
                  </div>

                  {/* Form Heading */}
                  <h2 className="text-3xl text-center mb-8 font-semibold">Now, Let&apos;s talk about ✨ The Day</h2>

                  {/* Input Fields */}
                  <div className="mb-6">
                      <div className="mb-4">
                          <label className="block font-light mb-1">Wedding date</label>
                          <span className="text-gray-400 text-sm">(Don&apos;t worry! You can change this later)</span>
                          <Input className="h-10 w-full md:w-8/12 rounded-xl border-2 border-gray-300 mt-2" type="date" />
                      </div>
                      <div className="flex items-center">
                          <Checkbox className="border-gray-400 border-2 mr-2 mt-1 rounded-md" />
                          <label className="font-light mt-1">We&apos;re still deciding</label>
                      </div>
                  </div>

                  {/* Next Button */}
                  <div className="text-center mt-6">
                      <Button className="w-full bg-primary hover:bg-primary-dark text-black font-bold rounded-lg h-12" onClick={handleNext}>
                          Next
                      </Button>
                  </div>

                  {/* Skip Onboarding */}
                  <button className="mt-10 text-center text-black block w-full" onClick={handleSkip}>
                      Skip the onboarding process
                  </button>
              </div>
          </div>
      </div>
    )
}

export default pageTwo;
