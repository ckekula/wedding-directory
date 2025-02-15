import { useQuery } from "@apollo/client";
import { GET_VISITOR_CHATS } from "@/graphql/queries";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface Message {
  content: string;
  senderId: string;
  senderType: string;
  timestamp: string;
}

interface Chat {
  chatId: string;
  vendor: {
    id: string;
  };
  messages: Message[];
}

interface VisitorChatListProps {
  chats: Chat[];
}

const VisitorChatList = ({ chats }: VisitorChatListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">My Conversations</h2>

      {chats.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No conversations yet</p>
      ) : (
        chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <Link
              href={`/visitor-dashboard/chats/${chat.chatId}`}
              key={chat.chatId}
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    Vendor ID: {chat.vendor?.id || "Unknown Vendor"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {lastMessage?.content || "No messages yet"}
                  </p>
                </div>
                {lastMessage && (
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(lastMessage.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                )}
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default VisitorChatList;