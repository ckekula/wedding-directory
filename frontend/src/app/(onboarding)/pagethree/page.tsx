"use client";

import React from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FaCircleCheck } from "react-icons/fa6";
import { TbCircleNumber3Filled } from "react-icons/tb";
import { GoHorizontalRule } from "react-icons/go";
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';


const OnboardThree = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/visitor-dashboard');
    };

    return (
        <div className="bg-lightYellow font-title h-screen">
            <div className="flex flex-col md:flex-row h-screen">

                <div className="relative w-full m-3 md:w-5/12 h-full md:h-auto rounded-2xl overflow-hidden">
                    <Image
                        src="/onboard2.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="onboard image"
                    />
                </div>

                <Link href="/">
                    <button
                        className="absolute top-5 right-5 text-black hover:text-gray-500" >
                        <X className="w-6 h-6" />
                    </button>
                </Link>

                <div className="w-full md:w-7/12 p-5 border-l-2 border-black">
                    <Link href="/pagetwo">
                        <button
                            className="absolute top-5 transform -translate-x-1/6 text-black font-body hover:text-gray-500">  &larr; Back
                        </button>
                    </Link>



                    <div className='flex flex-col justify-start items-center p-10 mt-8'>

                        <div className="flex items-center font-body justify-center text-center space-x-2 text-lg mt-8 mb-3">
                            <FaCircleCheck />
                            <label className='text-base'>Get Started</label>
                            <GoHorizontalRule className='text-6xl' />
                            <FaCircleCheck />
                            <label className='text-base'>Plan</label>
                            <GoHorizontalRule className='text-6xl' />
                            <TbCircleNumber3Filled />
                            <label className='text-base'>Finish Up</label>
                        </div>

                        <div>
                            <h1 className="mx-40 text-3xl text-start mb-2">Nice! Before we continue, one last thing</h1>
                       
                            <h1 className="text-sm mx-40 text-gray-600 text-opacity-90 mb-6">We&apos;ll help you plan the wedding you want - small or big, near or far</h1>
                        </div>

                        <div className="flex flex-col md:flex-col space-y-2 md:space-y-0 -ml-12 mb-6">
                            <div className="w-full md:w-full h-1/2 md:h-full relative">
                                <label className="block font-light mb-2">Where are you getting married? (Type in your venue)</label>
                                <div className="border-gray-300 border-solid rounded-xl border-2 ">
                                    <Input className="h-9 w-full rounded-xl" type="text" id="" placeholder="" />
                                </div>
                            </div>
                            <div className="w-full h-1/2 md:h-full relative flex items-center ">
                                <Checkbox className="border-gray-400 border-solid  border-2 mr-2 mt-4 rounded-md" />
                                <label className="font-light mt-4">We&apos;re still deciding</label>
                            </div>
                        </div>


                        <div className="mt-4 flex flex-col w-7/12 mb-6">
                            <Button onClick={handleClick} className="rounded-none text-black font-bold hover:bg-primary bg-primary text-lg">
                                Let&apos;s go
                            </Button>
                        </div>


                        <Link href="/visitor-dashboard"className="mt-32 text-center text-black "> Skip the onboarding process</Link>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default OnboardThree