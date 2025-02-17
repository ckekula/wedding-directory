"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_CHAT_VISITOR_DETAILS } from "@/graphql/queries";

interface Chat {
  chatId: string;
  visitorId: string;
  messages: {
    content: string;
    timestamp: string;
  }[];
}

interface ChatListProps {
  chats: Chat[];
}

const ChatListItem = ({ chat }: { chat: Chat }) => {
  const { data, loading, error } = useQuery(GET_CHAT_VISITOR_DETAILS, {
    variables: { id: chat.visitorId },
  });

  const lastMessage = chat.messages[chat.messages.length - 1];

  if (loading) {
    return (
      <div className="animate-pulse flex items-center p-4 border-b">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  const visitor = data?.findVisitorById;

  return (
    <Link
      href={`/vendor-dashboard/chats/${chat.chatId}`}
      className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">
            {visitor?.visitor_fname} & {visitor?.partner_fname}
          </h3>
          <span className="text-xs text-gray-500">{visitor?.email}</span>
        </div>
        <p className="text-sm text-gray-500 truncate mt-1">
          {lastMessage?.content || "No messages yet"}
        </p>
      </div>
      {lastMessage && (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {formatDistanceToNow(new Date(lastMessage.timestamp), {
            addSuffix: true,
          })}
        </span>
      )}
    </Link>
  );
};

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
      {chats.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No conversations yet
        </div>
      ) : (
        chats.map((chat) => <ChatListItem key={chat.chatId} chat={chat} />)
      )}
    </div>
  );
}
