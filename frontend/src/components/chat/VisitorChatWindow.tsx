import { useQuery, useMutation } from "@apollo/client";
import { GET_CHAT_HISTORY } from "@/graphql/queries";
import { SEND_MESSAGE } from "@/graphql/mutations";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useAuth } from "@/contexts/VisitorAuthContext";

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
  const [message, setMessage] = useState("");
  const { visitor } = useAuth();
  

  const { data, loading, refetch} = useQuery(GET_CHAT_HISTORY, {
    variables: { chatId },
    skip: !chatId,
    pollInterval:1000,
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage({
        variables: {
          chatId,
          content: message,
          visitorSenderId: visitor?.id,
        },
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <div>Loading messages...</div>;

  const messages = data?.getChatHistory?.messages || [];

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
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

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default VisitorChatWindow;
