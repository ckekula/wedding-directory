import React from 'react'
import { Progress } from "@/components/ui/progress"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";



const Reviews = () => {
    return (
        <div>
            <div className='flex w-full font-body'>
                <div className='w-1/2 flex flex-col font-body text-2xl ml-4 mt-2'>
                {4} out of 5
                <div className='flex flex-row text-3xl text-yellow-400 my-2 '>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaRegStar/>
                </div>
                <div className='text-xl'>
                {20} Reviews
                </div>
                 </div>

                <div className='w-1/2 flex flex-col -ml-10'>
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