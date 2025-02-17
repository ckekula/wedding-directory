import { useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { GET_VENDOR_DETAILS, GET_VISITOR_CHATS } from "@/graphql/queries";
import { FaStore } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

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

const ChatItem = ({ chat, visitorId }: { chat: Chat; visitorId: string }) => {
  const { data: vendorData } = useQuery(GET_VENDOR_DETAILS, {
    variables: { id: chat.vendorId },
    skip: !chat.vendorId,
  });

  const lastMessage = chat.messages[chat.messages.length - 1];
  const vendor = vendorData?.findVendorById;

  return (
    <Link
      href={`/visitor-dashboard/chats/${visitorId}/${chat.chatId}`}
      className="block hover:bg-gray-50 transition-colors p-4 border-b last:border-b-0"
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full">
          <FaStore className="text-xl text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 font-body">
                {vendor?.busname || "Loading vendor..."}
              </h3>
              <div className="flex items-center font-body  gap-1 text-sm text-gray-500 mt-1">
                <IoLocationSharp className="text-green-500" />
                <span >{vendor?.city || "Loading location..."}</span>
              </div>
            </div>
            {lastMessage && (
              <span className="text-xs text-gray-500 font-body">
                {formatDistanceToNow(new Date(lastMessage.timestamp), {
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-1">
            {lastMessage?.content || "No messages yet"}
          </p>
        </div>
      </div>
    </Link>
  );
};

const VisitorChatList = ({ visitorId }: VisitorChatListProps) => {
  const { data, loading } = useQuery(GET_VISITOR_CHATS, {
    variables: { visitorId },
    skip: !visitorId,
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mx-auto"></div>
      </div>
    );
  }

  const chats = data?.getVisitorChats || [];

  return (
    <div className="divide-y divide-gray-100">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 font-title">
          My Conversations
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {chats.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStore className="text-2xl text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No conversations yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Your messages with vendors will appear here
            </p>
          </div>
        ) : (
          chats.map((chat: Chat) => (
            <ChatItem key={chat.chatId} chat={chat} visitorId={visitorId} />
          ))
        )}
      </div>
    </div>
  );
};

export default VisitorChatList;