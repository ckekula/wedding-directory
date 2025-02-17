"use client";

import { useParams } from "next/navigation";
import VisitorChatList from "@/components/chat/VisitorChatList";

const ChatPage = () => {
  const { visitorId } = useParams() as { visitorId: string };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <VisitorChatList visitorId={visitorId} />
      </div>
    </div>
  );
};

export default ChatPage;
