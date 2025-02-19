"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "@/graphql/mutations";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { IoSend } from "react-icons/io5";

interface MessageInputProps {
  chatId: string;
}

export default function MessageInput({ chatId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const { vendor } = useVendorAuth();

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      // You might want to refetch the chat history after sending
      // Similar to the visitor implementation
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage({
        variables: {
          chatId,
          content: message.trim(),
          vendorSenderId: vendor?.id,
        },
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="border-t bg-white py-4">
      <form onSubmit={handleSubmit} className="px-5 mx-auto">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 rounded-full bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
          >
            <IoSend className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
}
