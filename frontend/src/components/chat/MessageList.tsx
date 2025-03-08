import { useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaUserCircle } from "react-icons/fa";
import { Message } from "../VendorChat";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const isVendor = message.senderType === "vendor";
        return (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              isVendor ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                <FaUserCircle className="text-lg text-accent" />
              </div>
            </div>
            <div
              className={`group max-w-[70%] ${
                isVendor ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl ${
                  isVendor
                    ? "bg-accent text-white rounded-br-none"
                    : "bg-slate-300 text-gray-900 shadow-sm rounded-bl-none"
                }`}
              >
                <p className="leading-relaxed font-body">{message.content}</p>
                <span
                  className={`text-xs mt-1  group-hover:opacity-100 transition-opacity ${
                    isVendor
                      ? "text-white text-right text-[10px] font-body"
                      : "text-black text-[10px] font-body"
                  }`}
                >
                  {formatDistanceToNow(new Date(message.timestamp), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
