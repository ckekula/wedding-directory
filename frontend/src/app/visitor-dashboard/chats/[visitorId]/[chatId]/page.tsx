"use client";

import { useParams } from "next/navigation";
import VisitorChatWindow from "@/components/chat/VisitorChatWindow";
import Link from "next/link";

const ChatDetailPage = () => {
  const { chatId, visitorId } = useParams() as {
    chatId: string;
    visitorId: string;
  };

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <Link
        href={`/visitor-dashboard/chats/${visitorId}`}
        className="mb-4 inline-block"
      >
        ← Back to Conversations
      </Link>
      <VisitorChatWindow chatId={chatId} />
    </div>
  );
};

export default ChatDetailPage;
