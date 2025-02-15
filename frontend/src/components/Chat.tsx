"use client"
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '@/contexts/VisitorAuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CHAT } from '@/graphql/mutations';
import { GET_CHAT } from '@/graphql/queries';

interface ChatProps {
  vendorId: string;
}

const socket = io('http://localhost:4000/chat', {
  transports: ['websocket'],
  withCredentials: true
});

const Chat: React.FC<ChatProps> = ({ vendorId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string>("");
    
  const { visitor } = useAuth();

  const [createChat] = useMutation(CREATE_CHAT);
  const { data: chatData } = useQuery(GET_CHAT, {
    variables: { visitorId: visitor?.id, vendorId },
    skip: !visitor?.id || !vendorId,
  });

  useEffect(() => {
    const initializeChat = async () => {
      if (!chatData?.chat) {
        const { data } = await createChat({
          variables: { visitorId: visitor?.id, vendorId },
        });
        setChatId(data.createChat.id);
      } else {
        setChatId(chatData.chat.id);
      }
    };

    if (visitor?.id && vendorId) {
      initializeChat();
    }
  }, [visitor?.id, vendorId, chatData, createChat]);

  useEffect(() => {
    if (chatId) {
      socket.emit("joinRoom", chatId);
      socket.on("newMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.off("newMessage");
    };
  }, [chatId]);

  const sendMessage = () => {
    if (!message.trim() || !chatId) return;

    socket.emit("sendMessage", {
      chatId: chatId,
      visitorSenderId: visitor?.id,
      content: message,
    });
    setMessage("");
  };

  if (!visitor) {
    return (
      <div className="p-4 text-center">
        Please login to chat with the vendor
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] w-full bg-white rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.visitorSenderId === visitor?.id
                ? "ml-auto bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
