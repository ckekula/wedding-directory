import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Comments = () => {
    return (
        <div>
            <hr className="border-t border-gray-300 my-4 font-body" />
            <div className='flex flex-row text-xl text-yellow-400 my-2 items-center'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
                <div className='ml-2 text-black text-lg'>
                    User1
                    01/01/2024
                </div>

            </div>
            <div>Having our wedding at The Barn on Walnut Hill was an absolute dream. Essie and Mike were great
                to work with and having the property for the weekend and a few days before made all the diff
                erence. The property is immaculately maintained. Being able to have getting ready photos, photos 
            </div>
        </div>
    )
}

export default Comments
