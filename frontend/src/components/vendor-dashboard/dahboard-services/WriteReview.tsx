import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const WriteReview = () => {
    const [rating, setRating] = useState(0);

    
    const handleRating = (rate: number) => {
        setRating(rate);
      };

    return (
        <div className='font-body'>
            <div>
                <h2>Rate the Vendor</h2>
                <div style={{ display: 'flex', gap: '5px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={24}
                            color={star <= rating ? '#ffc107' : '#e4e5e9'}
                            onClick={() => handleRating(star)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </div>
                <p>Your Rating: {rating} out of 5</p>
            </div>
            <div className='mt-2'>
                Write Your Review
                <div>
                    <textarea
                        className='my-2 p-1 border-2 rounded-lg border-gray-400'
                        id="content"
                        name="content"
                        placeholder="Write Your Experience about Vendor"
                        required
                        rows={4}
                        style={{ width: '60%', resize: 'none' }}
                    />
                </div>
            </div>
            <Button className='w-28 mx-2 font-bold hover:border-orange hover:text-orange hover:bg-orange/15' variant="ornageOutline">
                    SUBMIT
                </Button>
                {/* <Button className='w-28 font-bold text-red-700 border-red-700 hover:border-red-700 hover:text-red-700 hover:bg-red-700/15' variant="ornageOutline">
                    CLOSE
                </Button> */}
        </div>
    );
};

export default WriteReview;
