import { useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useVendorAuth } from "../../contexts/VendorAuthContext";

interface Message {
  content: string;
  senderId: string;
  senderType: "vendor" | "visitor";
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { vendor } = useVendorAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.senderType === "vendor" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.senderType === "vendor"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-900 shadow"
            }`}
          >
            <p>{message.content}</p>
            <span
              className={`text-xs ${
                message.senderType === "vendor"
                  ? "text-blue-100"
                  : "text-gray-500"
              }`}
            >
              {formatDistanceToNow(new Date(message.timestamp), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
