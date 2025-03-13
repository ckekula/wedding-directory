import React from 'react'
import Image from 'next/image'

interface vendorProps {
  vendor: {
    profilePic: string,
    fname: string,
    lname: string,
    city: string,
    phone: string,
    email: string,
  }
}

const VendorBanner = ({vendor}: vendorProps) => {
  return (
    <div className='bg-white w-full h-[200px] rounded-2xl shadow-md flex flex-row items-center justify-between px-10'>
      <div>
        <Image
          src={vendor?.profilePic || '/images/visitorPlaceholder.png'}
          alt='vendor banner'
          width={150}
          height={150}
          className='rounded-full'
        />

      </div>
      <div>
        <p className='text-2xl'>Good Morning/Evening!</p>
        <p className='text-4xl'>{vendor?.fname} {vendor?.lname}</p>
       

      </div>
      <div>
        <button className='bg-orange text-white px-4 py-2 rounded-lg'>Edit Profile</button>
        <p>{vendor?.city}</p>
        <p>{vendor?.phone}</p>
        <p>{vendor?.email}</p>

      </div>
    </div>
  )
}

export default VendorBanner