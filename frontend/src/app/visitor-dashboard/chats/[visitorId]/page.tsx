"use client";

import { useQuery } from "@apollo/client";
import { GET_VISITOR_CHATS } from "@/graphql/queries";
import { useParams } from "next/navigation";
import VisitorChatList from "@/components/chat/VisitorChatList";

const ChatPage = () => {
  const { visitorId } = useParams() as { visitorId: string };

  const { data, loading, error } = useQuery(GET_VISITOR_CHATS, {
    variables: { visitorId },
    skip: !visitorId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chats = data?.getVisitorChats;

  if (!chats) {
    return (
      <div className="p-6 max-w-[1064px] items-center">No chats found</div>
    );
  }

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <VisitorChatList chats={chats} />
    </div>
  );
};

export default ChatPage;
