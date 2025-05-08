import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_OFFERING_DETAILS } from "@/graphql/queries";

interface ChatHeaderProps {
  visitor: {
    visitor_fname: string;
    partner_fname: string;
    email: string;
  };
  offeringId?: string; // Add offering ID
}

export default function ChatHeader({ visitor, offeringId }: ChatHeaderProps) {
  // Add query for offering details if offeringId is provided
  const { data: offeringData } = useQuery(GET_OFFERING_DETAILS, {
    variables: { id: offeringId },
    skip: !offeringId,
  });

  const offering = offeringData?.findOfferingById;

  return (
    <div className="bg-white border-b px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
          <FaUserCircle className="text-2xl text-accent" size={50} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg text-gray-900">
              {visitor.visitor_fname} & {visitor.partner_fname}
            </h2>
            {offering && (
              <span className="px-2 py-1 text-xs bg-primary/10 text-accent rounded-full">
                {offering.name}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {visitor.email}
            {offering && ` • ${offering.category}`}
          </p>
        </div>
      </div>
    </div>
  );
}
