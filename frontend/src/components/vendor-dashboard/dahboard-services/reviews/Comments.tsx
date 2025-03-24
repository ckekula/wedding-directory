'use client';
import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_REVIEW_BY_SERVICE } from "@/graphql/queries";
import { Button } from "@/components/ui/button";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";

interface CommentsProps {
  serviceId: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  visitor: {
    visitor_fname: string;
  };
}

const Comments: React.FC<CommentsProps> = ({ serviceId }) => {
  const { data: rdata, loading: reviewsLoading, error: reviewsError } = useQuery(FIND_REVIEW_BY_SERVICE, {
    variables: { offering_id: serviceId },
    skip: !serviceId,
  });

  const [showAll, setShowAll] = useState(false);

  if (reviewsLoading) return <LoaderHelix />;
  if (reviewsError) return <div>Error fetching reviews: {reviewsError.message}</div>;

  const reviewData = rdata?.findReviewsByOffering || [];
  const displayedReviews = showAll ? reviewData : reviewData.slice(0, 3);

  return (
    <div className="font-body" role="list" aria-live="polite">
      {displayedReviews.map((review: Review) => (
        <div key={review.id} role="listitem" className="ml-2 mb-4">
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex flex-row text-xl text-yellow-400 my-2 items-center">
            {/* Render star ratings */}
            {[...Array(5)].map((_, index) =>
              index < review.rating ? (
                <FaStar key={`${review.id}-${index}`} />
              ) : (
                <FaRegStar key={`${review.id}-${index}`} />
              )
            )}
            {/* Visitor name and date */}
            <div className="flex items-center ml-2">
              <span className="text-black text-lg">{review.visitor?.visitor_fname ?? "User"}</span>
              <span className="text-sm text-gray-500 ml-2">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          {/* Review comment */}
          <div>{review.comment}</div>
        </div>
      ))}

      {reviewData.length > 3 && (
        <div className="mt-4">
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            className='w-28 mx-2 font-bold hover:border-orange hover:text-orange hover:bg-orange/15'
            variant="ornageOutline">
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Comments;
