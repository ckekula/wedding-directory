"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_CHAT, GET_CHAT_HISTORY} from "@/graphql/queries";
import { CREATE_CHAT, SEND_MESSAGE} from "@/graphql/mutations";

interface ChatProps {
  visitorId: string;
  vendorId: string;
}

const Chat = ({ visitorId, vendorId }: ChatProps) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);

  const [createChat] = useMutation(CREATE_CHAT);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useQuery(GET_CHAT, {
    variables: { visitorId, vendorId },
    onCompleted: (data) => {
      if (data?.chat) {
        setChatId(data.chat.id);
      } else {
        initializeChat();
      }
    },
  });

  const { data: messagesData, refetch: refetchMessages } = useQuery(
    GET_CHAT_HISTORY,
    {
      variables: { chatId },
      skip: !chatId,
    }
  );

  const initializeChat = async () => {
    try {
      const { data } = await createChat({
        variables: {
          visitorId,
          vendorId,
        },
      });
      setChatId(data.createChat.id);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    try {
      await sendMessage({
        variables: {
          chatId,
          visitorSenderId: visitorId,
          content: newMessage,
        },
      });
      setNewMessage("");
      refetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (messagesData?.chatMessages) {
      setMessages(messagesData.chatMessages);
    }
  }, [messagesData]);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message: { id: string; visitorSenderId: string; content: string; createdAt: string }) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.visitorSenderId === visitorId
                ? "ml-auto text-right"
                : "mr-auto"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.visitorSenderId === visitorId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
