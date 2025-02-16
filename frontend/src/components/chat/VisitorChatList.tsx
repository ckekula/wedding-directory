import { useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { GET_VENDOR_DETAILS, GET_VISITOR_CHATS } from "@/graphql/queries";

interface Message {
  content: string;
  senderId: string;
  senderType: string;
  timestamp: string;
}

interface Chat {
  chatId: string;
  vendorId: string;
  messages: Message[];
}

interface VisitorChatListProps {
  visitorId: string;
}

const ChatItem = ({ chat }: { chat: Chat }) => {
  const { data: vendorData } = useQuery(GET_VENDOR_DETAILS, {
    variables: { id: chat.vendorId },
    skip: !chat.vendorId,
  });

  console.log("Vendor Data:", vendorData);
  console.log("Chat Vendor ID:", chat.vendorId);

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
            {vendorData?.findVendorById?.busname || "Loading vendor..."}
          </h3>
          <p className="text-sm text-gray-500">
            {vendorData?.findVendorById?.city}
          </p>
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
};

const VisitorChatList = ({ visitorId }: VisitorChatListProps) => {
  const { data, loading } = useQuery(GET_VISITOR_CHATS, {
    variables: { visitorId },
    skip: !visitorId,
  });

  console.log("Chat Data:", data);

  if (loading) return <div>Loading chats...</div>;

  const chats = data?.getVisitorChats || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">My Conversations</h2>

      {chats.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No conversations yet</p>
      ) : (
        <div className="space-y-4">
          {chats.map((chat: Chat) => (
            <ChatItem key={chat.chatId} chat={chat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitorChatList;
