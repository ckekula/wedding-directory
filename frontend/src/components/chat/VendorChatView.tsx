"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";
import { useQuery } from "@apollo/client";
import { GET_VENDOR_CHAT} from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import VendorHeader from "@/components/shared/Headers/VendorHeader";
import Link from "next/link";
import { Message } from "../VendorChat";

const socket = io("http://localhost:4000/chat", {
  transports: ["websocket"],
  withCredentials: true,
});

const VendorChatView = () => {
  const params = useParams();
  const { chatId } = params;
  const { vendor } = useVendorAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { data, loading } = useQuery(GET_VENDOR_CHAT, {
    variables: { chatId },
    skip: !chatId,
  });

  useEffect(() => {
    if (data?.chatMessages) {
      setMessages(data.chatMessages);
    }
  }, [data]);

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
      chatId,
      vendorSenderId: vendor?.id,
      content: message,
    });
    setMessage("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-lightYellow">
      <VendorHeader />
      <div className="container mx-auto p-6">
        <Link href="/vendor-dashboard/messages" className="mb-4 inline-block">
          <span className="text-black hover:text-gray-600">
            &larr; Back to Messages
          </span>
        </Link>

        <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
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
      </div>
    </div>
  );
};

export default VendorChatView;
