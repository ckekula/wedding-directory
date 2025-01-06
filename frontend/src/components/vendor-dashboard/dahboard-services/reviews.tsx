import React from 'react';
import { Progress } from "@/components/ui/progress";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

type ReviewData = {
    totalReviews: number;
    ratingsCount: Record<number, number>;
};

const Reviews: React.FC = () => {
    const reviewData: ReviewData = {
        totalReviews: 100,
        ratingsCount: {
            5: 70,
            4: 25,
            3: 8,
            2: 2,
            1: 0,
        },
    };

    const calcAverage = (): number => {
        const totalStars = Object.entries(reviewData.ratingsCount).reduce(
            (acc, [star, count]) => acc + Number(star) * count,
            0
        );
        return reviewData.totalReviews > 0
            ? parseFloat((totalStars / reviewData.totalReviews).toFixed(1))
            : 0;
    };

    const calcPercentage = (count: number): number => {
        return reviewData.totalReviews > 0
            ? Math.round((count / reviewData.totalReviews) * 100)
            : 0;
    };

    const renderStars = (avgRating: number) => {
        const fullStars = Math.floor(avgRating);
        const halfStars = avgRating % 1;
        const emptyStars = 5 - Math.ceil(avgRating); // Remaining empty stars

        return (
            <>
                {/* Full stars */}
                {Array.from({ length: fullStars }, (_, index) => (
                    <FaStar key={`star-full-${index}`} />
                ))}
                {/* Half star */}
                {halfStars && <FaRegStarHalfStroke />}
                {/* Empty stars */}
                {Array.from({ length: emptyStars }, (_, index) => (
                    <FaRegStar key={`star-empty-${index}`} />
                ))}
            </>
        );
    };

    const avgRating = calcAverage();

    return (
        <div>
            <div className='flex flex-col md:flex-row w-full font-body'>
                {/* Left Section */}
                <div className='w-1/2 flex flex-col font-body text-xl ml-4'>
                    <div className='text-2xl'>
                        {avgRating} out of 5.0
                    </div>
                    <div className='flex flex-row text-3xl text-yellow-400 my-2'>
                        {renderStars(avgRating)}
                    </div>
                    <div className='text-xl'>
                        {reviewData.totalReviews} Reviews
                    </div>
                </div>

                {/* Right Section */}
                <div className='w-1/2 flex flex-col ml-4 md:-ml-10'>
                    {Object.entries(reviewData.ratingsCount)
                        .sort((a, b) => Number(b[0]) - Number(a[0]))
                        .map(([star, count]) => {
                            const percentage = calcPercentage(count);
                            return (
                                <div key={star} className='flex flex-row items-center'>
                                    <span className='mr-2 mb-2 w-20'>{star} Stars</span>
                                    <Progress value={percentage} />
                                    <div className='ml-2 w-10 justify-start'>{percentage}%</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
