"use client";

import { useParams } from "next/navigation";
import VisitorChatList from "@/components/chat/VisitorChatList";
import Breadcrumbs from "@/components/Breadcrumbs";

const ChatPage = () => {
  const { visitorId } = useParams() as { visitorId: string };

  return (
    <div className="py-4 px-2 md:py-6 md:px-4">
      {/* Hide breadcrumbs on mobile */}
      <div className="hidden md:block shadow-md bg-white p-4 rounded-lg mb-4 md:mb-6">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/visitor-dashboard" },
            { label: "Chats", href: "/visitor-dashboard/chat" },
          ]}
        />
        <div>
          <h1 className="text-4xl md:text-3xl font-bold text-black font-title my-3">
            My Conversations
          </h1>
          <p className="font-body text-xl text-black">
            Connect with vendors in real-time.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <VisitorChatList visitorId={visitorId} />
      </div>
    </div>
  );
};

export default ChatPage;
