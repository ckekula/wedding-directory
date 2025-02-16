"use client";

import { useQuery } from "@apollo/client";
import { GET_VISITOR_CHATS } from "@/graphql/queries";
import { useParams } from "next/navigation";
import VisitorChatList from "@/components/chat/VisitorChatList";

const ChatPage = () => {
  const { visitorId } = useParams() as { visitorId: string };

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <VisitorChatList visitorId={visitorId} />
    </div>
  );
};

export default ChatPage;
