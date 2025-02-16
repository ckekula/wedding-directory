"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_VISITOR_CHATS } from "@/graphql/queries";
import { useParams } from "next/navigation";
import VisitorChatList from "@/components/chat/VisitorChatList";
import VisitorChatWindow from "@/components/chat/VisitorChatWindow";

const ChatPage = () => {
  const { visitorId } = useParams() as { visitorId: string };
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_VISITOR_CHATS, {
    variables: { visitorId },
    skip: !visitorId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chats = data?.getVisitorChats;

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <VisitorChatList
        visitorId={visitorId}
        onSelectChat={(chatId) => setSelectedChatId(chatId)}
      />
      {selectedChatId && <VisitorChatWindow chatId={selectedChatId} />}
    </div>
  );
};

export default ChatPage;
