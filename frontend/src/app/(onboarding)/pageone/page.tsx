import React from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const page = () => {
    return (
        <div className="bg-background">
            <div className="flex flex-col md:flex-row h-screen">

                    <div className="w-full m-5 md:w-1/2 h-1/2 md:h-full relative rounded-2xl overflow-hidden">
 
                    <Image
                        src="/bride.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="sign image"
                        
                    />
                    
                </div>



                <div className="w-full md:w-1/2 p-10 flex flex-col border-l-2 border-black">
                    <button className="mb-4 text-left text-gray-500 text-sm">&larr; Back</button>

                    <div className=" p-10 justify-center">

                        <h2 className="text-2xl font-semibold mb-4">Like any great relationship, this one starts with basics</h2>

                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block mb-3">First Name</label>
                                <div className="border-black border-solid border-2 rounded-lg w-2/3">
                                    <Input className="h-8" type="text" id="" placeholder="" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block mb-3">First Name</label>
                                <div className="border-black border-solid border-2 rounded-lg w-2/3">
                                    <Input className="h-8" type="text" id="" placeholder="" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block mb-3">First Name</label>
                                <div className="border-black border-solid border-2 rounded-lg w-2/3">
                                    <Input className="h-8" type="text" id="" placeholder="" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block mb-3">First Name</label>
                                <div className="border-black border-solid border-2 rounded-lg w-2/3">
                                    <Input className="h-8" type="text" id="" placeholder="" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block mb-3">First Name</label>
                                <div className="border-black border-solid border-2 rounded-lg w-2/3">
                                    <Input className="h-8" type="date" id="" placeholder="" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <label className="block mb-3">First Name</label>
                                <div className="border-black border-solid border-2 rounded-lg w-2/3">

                                </div>
                            </div>
                        </div>

                        <div className="  mt-6 flex flex-col w-full ">
                            <Button className="rounded-none text-black font-bold hover:bg-primary bg-primary text-lg">
                                Log In
                            </Button>
                        </div>
                    </div>
                    <button className="mt-20 text-center text-gray-500 text-sm"> Back</button>
                </div>
            </div>
        </div>
    )
}

export default page
