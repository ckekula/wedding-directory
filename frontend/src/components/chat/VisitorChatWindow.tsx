import { useQuery } from "@apollo/client";
import { GET_CHAT_HISTORY } from "@/graphql/queries";
import { formatDistanceToNow } from "date-fns";

interface Message {
  content: string;
  senderId: string;
  senderType: string;
  timestamp: string;
}

interface VisitorChatWindowProps {
  chatId: string;
}

const VisitorChatWindow = ({ chatId }: VisitorChatWindowProps) => {
  const { data, loading } = useQuery(GET_CHAT_HISTORY, {
    variables: { chatId },
    skip: !chatId,
  });

  if (loading) return <div>Loading messages...</div>;

  const messages = data?.getChatHistory?.messages || [];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={`flex ${
              message.senderType === "visitor" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderType === "visitor"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70">
                {formatDistanceToNow(new Date(message.timestamp), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorChatWindow;
