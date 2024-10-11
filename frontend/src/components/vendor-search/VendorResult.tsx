import Image from 'next/image'
import React from 'react'
import { CiHeart } from "react-icons/ci";
import { Button } from '../ui/button';
import { PackageProps } from '@/types/packageTypes';

const VendorResult = ({
  vendor, city, rating, price, about, banner
}: PackageProps) => {
  return (
    <div>
      <div className="flex">
        <div className="flex justify-left items-start mb-5 border rounded-2xl shadow-lg hover:shadow-xl cursor-pointer m-0 p-0">

          <div className="flex flex-col p-0 m-0 ">
            <Image
              src={banner}
              alt="invi"
              className="w-full h-full object-cover rounded-xl"
              layout="responsive"
              width={600}
              height={500}
            />
            <div className="p-2 m-0">
              <div className="flex flex-row mb-2">
                <div className='w-5/6'>
                  <div className='text-md'>{city}</div>
                  <h3 className="text-xl font-bold">{vendor}</h3>
                  <div className='text-md'>{rating}</div>
                </div>
                <div className='w-1/6 text-3xl flex flex-col items-center'>
                  <CiHeart />
                  <p className='text-xs mt-2'>{price}</p>
                </div>
              </div>
              <div className='mb-2'>{about}</div>
              <div className="flex justify-center m-2 items-center h-full">
                <Button className="rounded-none text-white w-48 h-5/6 hover:bg-orange bg-orange">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default VendorResult
