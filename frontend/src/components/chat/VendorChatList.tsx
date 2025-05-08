"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@apollo/client";
import {
  GET_CHAT_VISITOR_DETAILS,
  GET_OFFERING_DETAILS,
} from "@/graphql/queries";
import { FaUserCircle } from "react-icons/fa";
import { FaInbox } from "react-icons/fa6";

interface Chat {
  chatId: string;
  visitorId: string;
  offeringId: string;
  messages: {
    content: string;
    timestamp: string;
  }[];
}

interface ChatListProps {
  chats: Chat[];
}

const ChatListItem = ({ chat }: { chat: Chat }) => {
  const { data: visitorData } = useQuery(GET_CHAT_VISITOR_DETAILS, {
    variables: { id: chat.visitorId },
  });

  const { data: offeringData } = useQuery(GET_OFFERING_DETAILS, {
    variables: { id: chat.offeringId },
  });

  const lastMessage = chat.messages[chat.messages.length - 1];
  const visitor = visitorData?.findVisitorById;
  const offering = offeringData?.findOfferingById;

  if (!visitor) {
    return (
      <div className="animate-pulse flex items-center p-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/vendor-dashboard/chats/${chat.chatId}`}
      className="flex items-center p-4 hover:bg-gray-50 transition-colors rounded-lg hover:shadow-md"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mr-4">
        <FaUserCircle className="text-2xl text-accent" size={45} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 font-body">
              {visitor?.visitor_fname} & {visitor?.partner_fname}
            </h3>
            <span className="px-2 py-1 text-xs bg-primary/10 text-accent rounded-full font-body">
              {offering?.name || "Service"}
            </span>
          </div>
          {lastMessage && (
            <span className="text-xs text-gray-500 font-body">
              {formatDistanceToNow(new Date(lastMessage.timestamp), {
                addSuffix: true,
              })}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-1 font-body">
          {lastMessage?.content || "No messages yet"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {visitor?.email} • {offering?.category}
        </p>
      </div>
    </Link>
  );
};

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="space-y-2 bg-white rounded-xl shadow-sm border border-gray-100">
      {chats.length === 0 ? (
        <div className="p-8 text-center">
          <FaInbox className="mx-auto text-4xl text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No conversations yet</p>
          <p className="text-sm text-gray-400">
            Your messages with couples will appear here
          </p>
        </div>
      ) : (
        chats.map((chat) => <ChatListItem key={chat.chatId} chat={chat} />)
      )}
    </div>
  );
}
