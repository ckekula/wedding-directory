import React from 'react'
import { CiLocationOn, CiMail } from "react-icons/ci";
import { TbPhoneCall } from "react-icons/tb";
import Image from 'next/image';

const ProfileInfo = () => {
    return (
        <div className="bg-white p-2 rounded-lg shadow-lg flex items-center justify-center container">
            <div className='w-1/4 pl-4'>
                <Image
                    className="w-32 h-32 rounded-full"
                    src="/images/visitor_profile_pic.jpg"
                    alt="profile"
                />
            </div>
            <div className='w-2/4 flex flex-col p-6'>
                <p className='text-xl'>Good Morning</p>
                <p className='text-2xl font-bold'>John Doe</p>
                <p className='text-xl font-bold'>John&apos;s wedding services</p>
            </div>
            <div className='w-2/4 flex flex-col p-6'>
                <div className='flex items-center '>
                    <CiLocationOn />
                    <span className='ml-2'>Kandy</span>
                </div>
                <div className='flex items-center'>
                    <TbPhoneCall />
                    <span className='ml-2'>01xxxxxxxx</span>
                </div>
                <div className='flex items-center'>
                    <CiMail />
                    <span className='ml-2'>example@gmail.com</span>
                </div>
            </div>

        </div>
    )
}

export default ProfileInfo
