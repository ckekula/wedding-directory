import React from 'react'
import { Progress } from "@/components/ui/progress"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const Reviews = () => {
    return (
        <div>
            <div className='flex flex-col md:flex-row w-full font-body'>
                <div className='w-1/2 flex flex-col font-body text-xl ml-4'>
                {4} out of 5
                <div className='flex flex-row text-3xl text-yellow-400 my-2 '>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaRegStar/>
                </div>
                <div className='text-lg'>
                {20} Reviews
                </div>
                {/* <Button className='mt-2 w-36 font-bold hover:border-orange hover:text-orange hover:bg-orange/15' variant="ornageOutline">
                    Write a Review
                </Button> */}
                 </div>

                <div className='w-1/2 flex flex-col ml-4 md:-ml-10'>
                    <div className='flex flex-row items-center'>
                        <p className='mr-2 mb-2 w-20'>5 Stars</p>
                        <Progress value={70} />
                        <div className='ml-2 w-10 justify-start'>70%</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <span className='mr-2 mb-2 w-20'>4 Stars</span>
                        <Progress value={20} />
                        <div className='ml-2 w-10 justify-start'>20%</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <span className='mr-2 mb-2 w-20'>3 Stars</span>
                        <Progress value={8} />
                        <div className='ml-2 w-10 justify-start'>8%</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <span className='mr-2 mb-2 w-20'>2 Stars</span>
                        <Progress value={2} />
                        <div className='ml-2 w-10 justify-start'>2%</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <span className='mr-2 mb-2 w-20'>1 Stars</span>
                        <Progress value={0} />
                        <div className='ml-2 w-10 justify-start'>0%</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Reviews