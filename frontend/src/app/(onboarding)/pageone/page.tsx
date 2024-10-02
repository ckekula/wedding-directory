"use client";

import React from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TbCircleNumber1Filled, TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb";
import { GoHorizontalRule } from "react-icons/go";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const OnboardOne = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/pagetwo');
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
                    <Link href="/">
                        <button
                            className="absolute top-5 transform -translate-x-1/6 text-black font-body hover:text-gray-500">  &larr; Back
                        </button>
                    </Link>

                    <div className='flex flex-col justify-center items-center p-10 mt-8'>

                        <div className="flex items-center font-body justify-center text-center space-x-2 text-lg mt-8 mb-3">
                            <TbCircleNumber1Filled />
                            <label className='text-base'>Get Started</label>
                            <GoHorizontalRule className='text-6xl' />
                            <TbCircleNumber2 />
                            <label className='text-base'>Plan</label>
                            <GoHorizontalRule className='text-6xl' />
                            <TbCircleNumber3 />
                            <label className='text-base'>Finish Up</label>
                        </div>

                        <div>
                            <h2 className="mx-40 text-3xl text-start mb-6 ">Like any great relationship, this one starts with basics</h2>
                        </div>


                        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 mb-4">
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block font-light mb-2">First name</label>
                                <div className="border-gray-300 border-solid rounded-xl border-2 w-10/12">
                                    <Input className="h-9 w-full rounded-xl" type="text" id="" placeholder="" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block font-light mb-2">Last name</label>
                                <div className="border-gray-300 border-solid rounded-xl border-2 w-10/12">
                                    <Input className="h-9 w-full rounded-xl" type="text" id="" placeholder="" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 mb-4">
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block font-light mb-2">Partner&apos;s first Name</label>
                                <div className="border-gray-300 border-solid rounded-xl border-2 w-10/12">
                                    <Input className="h-9 w-full rounded-xl" type="text" id="" placeholder="" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block font-light mb-2">Partner&apos;s last name</label>
                                <div className="border-gray-300 border-solid rounded-xl border-2 w-10/12">
                                    <Input className="h-9 w-full rounded-xl" type="text" id="" placeholder="" />
                                </div>
                            </div>
                        </div>


                        <div className="mt-5 flex flex-col w-7/12 ">

                            <Button onClick={handleClick} className="rounded-none text-black font-bold hover:bg-primary bg-primary text-lg">
                                Next
                            </Button>

                        </div>

                        <Link href="/visitor-dashboard"className="mt-32 text-center text-black "> Skip the onboarding process</Link>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default OnboardOne
