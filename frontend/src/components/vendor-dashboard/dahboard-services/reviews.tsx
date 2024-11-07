import React from 'react'
import { Progress } from "@/components/ui/progress"


const Reviews = () => {
    return (
        <div>
            <div className='flex w-full'>
                <div className='w-1/2 flex flex-col'>
                    sdsd

                </div>
                <div className='w-1/2 flex flex-col'>
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