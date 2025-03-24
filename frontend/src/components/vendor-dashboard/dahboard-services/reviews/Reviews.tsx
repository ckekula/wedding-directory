import React from 'react';
import { Progress } from "@/components/ui/progress";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useQuery } from "@apollo/client";
import { FIND_REVIEW_BY_SERVICE } from "@/graphql/queries";
import LoaderHelix from '@/components/shared/Loaders/LoaderHelix';

interface ReviewsProps {
    serviceId: string;
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    offering_id: string;
    visitor_id: string;
    created_at: string;
}

  
const Reviews: React.FC<ReviewsProps> = ({ serviceId }) => {
    const{data: rdata, loading: reviewsLoading, error: reviewsError} = useQuery(FIND_REVIEW_BY_SERVICE, {
        variables: { offering_id: serviceId },
        skip: !serviceId,
    });

    if (reviewsLoading) return <LoaderHelix />;
    if (reviewsError) return <div>Error fetching reviews</div>;
    

    const ReviewData = rdata?.findReviewsByOffering || [];

    const totalReviews = ReviewData.length;
    const ratingsCount = ReviewData.reduce((acc: Record<number, number>, review: Review) => {
        const rating = review.rating;
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {});

    // Add missing rating levels with 0 if not present in ratings Count
    for (let i = 1; i <= 5; i++) {
        if (!ratingsCount[i]) {
            ratingsCount[i] = 0;
        }
    }

    const calcAverage = (): number => {
        const totalStars = Object.entries(ratingsCount).reduce(
            (acc, [star, count]) => acc + Number(star) * (count as number),
            0
        );
        return totalReviews > 0
            ? parseFloat((totalStars / totalReviews).toFixed(1))
            : 0;
    };

    const calcPercentage = (count: number): number => {
        return totalReviews > 0
            ? Math.round((count / totalReviews) * 100)
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
                {halfStars>0 && <FaRegStarHalfStroke />}
                {/* Empty stars */}
                {Array.from({ length: emptyStars }, (_, index) => (
                    <FaRegStar key={`star-empty-${index}`} />
                ))}
            </>
        );
    };

    const avgRating = calcAverage();

    return (
        <div className='font-body'>
            <div className='flex flex-col md:flex-row w-full font-body'>
                {/* Left Section */}
                <div className='w-1/2 flex flex-col font-body text-xl ml-4 mt-6'>
                    <div className='text-2xl'>
                        {avgRating} out of 5.0
                    </div>
                    <div className='flex flex-row text-3xl text-yellow-400 my-2'>
                        {renderStars(avgRating)}
                    </div>
                    <div className='text-xl'>
                        {totalReviews} Reviews
                    </div>
                </div>

                {/* Right Section */}
                <div className='w-1/2 flex flex-col ml-4 md:-ml-10'>
                    {Object.entries(ratingsCount)
                        .sort((a, b) => Number(b[0]) - Number(a[0]))
                        .map(([star, count]) => {
                            const percentage = calcPercentage(count as number);
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
