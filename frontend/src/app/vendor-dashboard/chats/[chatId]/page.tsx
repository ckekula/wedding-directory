"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_VENDOR_CHAT, GET_CHAT_VISITOR_DETAILS } from "@/graphql/queries";
import MessageList from "../../../../components/chat/MessageList";
import MessageInput from "../../../../components/chat/MessageInput";
import ChatHeader from "../../../../components/chat/chatHeader";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

export default function ChatPage() {
  const { chatId } = useParams();

  const {
    data: chatData,
    loading: chatLoading,
    error: chatError,
  } = useQuery(GET_VENDOR_CHAT, {
    variables: { chatId },
    pollInterval: 3000,
  });

  const { data: visitorData, loading: visitorLoading } = useQuery(
    GET_CHAT_VISITOR_DETAILS,
    {
      variables: { id: chatData?.getChatHistory?.visitorId },
      skip: !chatData?.getChatHistory?.visitorId,
    }
  );

  if (chatLoading || visitorLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );

  if (chatError)
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error loading chat: {chatError.message}
      </div>
    );

  // Extract data from queries
  const chat = chatData?.getChatHistory;
  const visitor = visitorData?.findVisitorById;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <Link
          href="/vendor-dashboard/chats"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-2"
        >
          <IoArrowBack className="text-lg" />
          <span className="font-body">Back to Conversations</span>
        </Link>
      </div>
      {visitor && <ChatHeader visitor={visitor} />}
      <MessageList messages={chat?.messages || []} />
      <MessageInput chatId={chatId as string} />
    </div>
  );
}
