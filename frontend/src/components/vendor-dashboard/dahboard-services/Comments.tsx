import { FaRegStar, FaStar } from "react-icons/fa";
import React from "react";
import { useQuery } from "@apollo/client";
import { FIND_REVIEW_BY_SERVICE } from "@/graphql/queries";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";

interface CommentsProps {
    serviceId: string;
}

const Comments: React.FC<CommentsProps> = ({ serviceId }) => {
  const { data: rdata, loading: reviewsLoading, error: reviewsError } = useQuery(FIND_REVIEW_BY_SERVICE, {
    variables: { offering_id: serviceId },
    skip: !serviceId,
  });

  if (reviewsLoading) return <LoaderHelix />;
  if (reviewsError) return <div>Error fetching reviews</div>;

  const reviewData = rdata?.findReviewsByOffering || [];
  
  // Render the comments section
  return (
    <div>
      <hr className="border-t border-gray-300 my-4 font-body" />
      {reviewData.map((review: any) => (
        <div key={review.id} className="mb-4">
          <div className="flex flex-row text-xl text-yellow-400 my-2 items-center">
            {[...Array(5)].map((_, index) => (
              index < review.rating ? <FaStar key={index} /> : <FaRegStar key={index} />
            ))}
            <div className="ml-2 text-black text-lg">
              {review.visitor?.name || "User"} {/* Assuming 'visitor' has 'name' */}
              {" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div>{review.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
