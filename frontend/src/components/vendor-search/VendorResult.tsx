import Image from 'next/image'
import React from 'react'

const VendorResult = () => {
  return (
    <div className='h-auto w-auto'>
          
          

    <div className="flex">
      <div className="flex justify-left items-start mb-5 p-2 border rounded-2xl shadow-lg hover:shadow-xl cursor-pointer">
        
        
        <div className="game-details flex flex-col">
        <Image
                  src="/invitation.jpg"
                  alt="invi"
                  className="w-full h-full object-cover"
                  layout="responsive"
                  width={500}
                  height={500}
                />
            <div>Lipton City, Nuwara Eliya</div>
          <h3 className="text-2xl mb-2">Bloom Photographers</h3>
          <div>Other Photographers You might like</div>
          <div className='mb-4'>We offer a personalized experience backed up by more than 30 years in  business delivering high quality, creative photography and video on time and within your wedding budget.</div>
          
        </div>
      </div>
    </div>
     </div>
   
  )
}

export default VendorResult
