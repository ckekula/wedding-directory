import { useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
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
  onSelectChat: (chatId: string) => void;
}

const ChatItem = ({
  chat,
  onSelectChat,
}: {
  chat: Chat;
  onSelectChat: (chatId: string) => void;
}) => {
  const { data: vendorData } = useQuery(GET_VENDOR_DETAILS, {
    variables: { id: chat.vendorId },
    skip: !chat.vendorId,
  });

  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div
      onClick={() => onSelectChat(chat.chatId)}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 cursor-pointer"
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
    </div>
  );
};

const VisitorChatList = ({ visitorId, onSelectChat }: VisitorChatListProps) => {
  const { data, loading } = useQuery(GET_VISITOR_CHATS, {
    variables: { visitorId },
    skip: !visitorId,
  });

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
            <ChatItem
              key={chat.chatId}
              chat={chat}
              onSelectChat={onSelectChat}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitorChatList;
