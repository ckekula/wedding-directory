"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '@/graphql/mutations';
import { useAuth } from '@/contexts/VisitorAuthContext';

interface WriteReviewProps {
    serviceId: string;
}

const WriteReview: React.FC<WriteReviewProps> = ({ serviceId }) => {
    const { visitor } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [createReview, { loading }] = useMutation(CREATE_REVIEW);

    const handleRating = (rating: number) => {
        setRating(rating);
    };

    
    console.log("Submitting review with serviceId:", serviceId); 
    console.log("Submitting review with visitor id:", visitor?.id);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await createReview({
                variables: {
                    input: {
                        rating,
                        comment,
                        offering_id: serviceId,
                        visitor_id: visitor?.id,
                    },
                },
            });

            if (response.data) {
                console.log("Review created successfully:", response.data);
                setRating(0);
                setComment("");
            }
        } catch (error) {
            console.error("Error creating review:", error);
        }
    };

    return (
        <div className='font-body'>
            <form onSubmit={handleSubmit}>
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
                            rows={4}
                            style={{ width: '60%', resize: 'none' }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>
                <Button
                    className='w-28 mx-2 font-bold hover:border-orange hover:text-orange hover:bg-orange/15'
                    variant="ornageOutline"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    );
};

export default WriteReview;
