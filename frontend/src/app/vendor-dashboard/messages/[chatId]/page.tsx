"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";
import { useQuery } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import VendorHeader from "@/components/shared/Headers/VendorHeader";
import Link from "next/link";
import Image from "next/image";

const socket = io("http://localhost:4000/chat", {
  transports: ["websocket"],
  withCredentials: true,
});

const ChatPage = () => {
  const params = useParams();
  const { chatId } = params;
  const { vendor } = useVendorAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const { data, loading } = useQuery(GET_CHAT_MESSAGES, {
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

  return (
    <div>
      <VendorHeader />
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/vendor-dashboard/messages">
            <span className="text-black hover:text-gray-600">&larr;</span>
          </Link>
          <Image
            src="/images/profilePic.webp"
            alt="Visitor Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-xl font-semibold">
            {data?.chatMessages[0]?.visitor?.name || "Chat"}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.vendorSenderId === vendor?.id
                    ? "ml-auto bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
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
                className="flex-1 p-3 border rounded-full"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
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

export default ChatPage;
