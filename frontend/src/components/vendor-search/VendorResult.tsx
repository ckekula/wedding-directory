import Image from 'next/image'
import React from 'react'
import { CiHeart } from "react-icons/ci";
import { Button } from '../ui/button';

const VendorResult = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex justify-left items-start mb-5 border rounded-2xl shadow-lg hover:shadow-xl cursor-pointer m-0 p-0">

          <div className="flex flex-col p-0 m-0 ">
            <Image
              src="/photography.jpg"
              alt="invi"
              className="w-full h-full object-cover rounded-xl"
              layout="responsive"
              width={600}
              height={500}
            />
            <div className="p-2 m-0">
              <div className="flex flex-row mb-2">
                <div className='w-5/6'>
                  <div className='text-md'>Lipton City, Nuwara Eliya</div>
                  <h3 className="text-xl font-bold">Bloom Photographers</h3>
                  <div className='text-md'>⭐ 4.9 (154) </div>
                </div>
                <div className='w-1/6 text-3xl flex flex-col items-center'>
                  <CiHeart />
                  <p className='text-xs mt-2'>$$-$$$</p>
                </div>
              </div>
              <div className='mb-2'>
                We offer a personalized experience backed up by more than 30 years in business delivering high quality, creative photography and video on time and within your wedding budget.
              </div>
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
