"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '@/graphql/mutations';
import { useAuth } from '@/contexts/VisitorAuthContext';
import toast from 'react-hot-toast';

interface WriteReviewProps {
    serviceId: string;
}

const WriteReview: React.FC<WriteReviewProps> = ({ serviceId }) => {
    const { visitor } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [createReview, { loading }] = useMutation(CREATE_REVIEW);
    const [showForm, setShowForm] = useState(false);  // State to control the form visibility

    const handleRating = (rating: number) => {
        setRating(rating);
    };

    const handleWriteReviewClick = () => {
        if (!visitor) {
            toast.error("You must be logged in to write a review", {
                duration: 3000,
                position: 'top-center',
            });
            return;
        }
        setShowForm((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast("Please select a rating before submitting!");
            return;
        }

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
                // eslint-disable-next-line no-console
                console.log("Review created successfully:", response.data);
                setRating(0);
                setComment("");
                setShowForm(false);  // Hide the form after submission
                toast.success("Review submitted successfully!");
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error creating review:", error);
            toast.error("Failed to submit review. Please try again.");
        }
    };

    return (
        <div className='font-body'>
            <Button
                onClick={handleWriteReviewClick}
                className='w-40 mx-2 font-bold hover:border-orange hover:text-orange hover:bg-orange/15'
                variant="ornageOutline"
            >
                {showForm ? "Hide Review" : "Write a Review"}
            </Button>

            {/* Only show the form if user is logged in and showForm is true */}
            {visitor && showForm && (
                <form onSubmit={handleSubmit}>
                    <hr className="border-t border-gray-300 my-4" />
                    <div className="mb-3 text-2xl font-bold font-title">Write a Review</div>
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
                                    aria-label={`${star} star`}
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
                                disabled={loading}
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
            )}
        </div>
    );
};

export default WriteReview;
