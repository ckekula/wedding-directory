import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useVendorAuth } from "@/contexts/VendorAuthContext";

const socket = io("http://localhost:4000/chat", {
  transports: ["websocket"],
  withCredentials: true,
});

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderType: 'visitor' | 'vendor';
  timestamp: string;
  vendorSenderId: string;
}

const VendorChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId] = useState<string>(
    "fa0cb49f-505c-473a-8f3b-569c0cb019ba"
  ); // Use existing chat ID
  const { vendor } = useVendorAuth();

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
      vendorSenderId: vendor?.id,
      content: message,
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.vendorSenderId === vendor?.id
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

export default VendorChat;
