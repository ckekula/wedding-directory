interface ChatHeaderProps {
  visitor: {
    visitor_fname: string;
    partner_fname: string;
    email: string;
  };
}

export default function ChatHeader({ visitor }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b px-4 py-3">
      <h2 className="font-semibold text-lg">
        {visitor.visitor_fname} & {visitor.partner_fname}
      </h2>
      <p className="text-sm text-gray-600">{visitor.email}</p>
    </div>
  );
}
