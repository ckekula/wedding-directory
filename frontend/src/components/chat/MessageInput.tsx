"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "@/graphql/mutations";
import { GET_VENDOR_CHAT } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";

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
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </form>
  );
}
