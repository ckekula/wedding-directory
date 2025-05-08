import React from 'react'
import Image from 'next/image'
import { VendorProps } from '@/types/vendorTypes'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const VendorBanner = ({ vendor }: VendorProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 15) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className='relative bg-white w-full h-[200px] rounded-2xl shadow-md flex flex-row items-center justify-between px-10'>
      {/* Edit button positioned at the top right */}
      <Link href="/vendor-dashboard/settings" className="absolute top-4 right-4">
        <FiEdit className="text-2xl text-orange hover:text-black cursor-pointer" />
      </Link>

      <div>
        <Image
          src={vendor?.profilePic || '/images/visitorPlaceholder.png'}
          alt='vendor banner'
          width={150}
          height={150}
          className='rounded-full'
        />
      </div>

      <div className='text-center'>
        <p className='text-xl mb-2'>{getGreeting()} {vendor?.fname} {vendor?.lname}!</p>
        <p className='text-4xl'>{vendor?.busname}</p>
      </div>

      <div className='text-left'>
        <div className='flex flex-row gap-2 py-1'>
          <FaLocationDot /><p>{vendor?.city}</p>
        </div>
        <div className='flex flex-row gap-2 py-1'>
          <FaPhoneAlt /><p>{vendor?.phone}</p>
        </div>
        <div className='flex flex-row gap-2 py-1'>
          <FaEnvelope /><p>{vendor?.email}</p>
        </div>
      </div>
    </div>
  )
}

export default VendorBanner
