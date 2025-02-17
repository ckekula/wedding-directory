import { FaUserCircle } from "react-icons/fa";

interface ChatHeaderProps {
  visitor: {
    visitor_fname: string;
    partner_fname: string;
    email: string;
  };
}

export default function ChatHeader({ visitor }: ChatHeaderProps) {
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
          </div>
          <p className="text-sm text-gray-600">{visitor.email}</p>
        </div>
      </div>
    </div>
  );
}
