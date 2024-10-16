import React from 'react'
import Image from "next/image";
import Header from '@/components/shared/Headers/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';

const Help = () => {
  return (
    <div className='bg-lightYellow font-body'>
      <Header />
      <div className='mx-10 '>
        <div className="relative z-10 w-10/12 h-[1000px] md:h-[300px] mx-auto flex justify-center items-center ">
          <div className="absolute inset-0 border-solid rounded-md">
            <Image
              src='/images/photography.jpg'
              layout="fill"
              objectFit="cover"
              alt="sign image"
            />
          </div>
        </div>
        <div className='mx-28 mt-4 bg-white rounded-lg py-5 px-6 mb-3'>
          <div className='font-title font-bold text-3xl mb-4'>Help</div>
          <div className='mb-2'>Explain the issue you are experiencing or ask us a question.</div>
          <div className='mb-2'>Our standard business hours are Monday through Friday 9:00 a.m. to 6:00 p.m. EST. We will respond to your request as quickly as possible!</div>
          <Link className='font-bold hover:cursor text-orange' href='/contact-us'>Contact Us</Link>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Help