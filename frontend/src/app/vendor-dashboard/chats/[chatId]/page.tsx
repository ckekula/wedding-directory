"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_VENDOR_CHAT, GET_CHAT_VISITOR_DETAILS } from "@/graphql/queries";
import MessageList from "../../../../components/chat/MessageList";
import MessageInput from "../../../../components/chat/MessageInput";
import ChatHeader from "../../../../components/chat/chatHeader";

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
      variables: { id: chatData?.getChatHistory?.visitorId }, // Updated path
      skip: !chatData?.getChatHistory?.visitorId,
    }
  );

  if (chatLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading chat...
      </div>
    );
  if (chatError)
    return (
      <div className="p-4 text-red-500">
        Error loading chat: {chatError.message}
      </div>
    );

  const chat = chatData?.getChatHistory; // Updated path
  const visitor = visitorData?.findVisitorById;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {visitor && <ChatHeader visitor={visitor} />}
      <MessageList messages={chat?.messages || []} />
      <MessageInput chatId={chatId as string} />
    </div>
  );
}
