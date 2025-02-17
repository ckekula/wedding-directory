"use client";

import { useQuery } from "@apollo/client";
import { GET_VENDOR_MESSAGES } from "@/graphql/queries";
import ChatList from "../../../components/chat/VendorChatList";
import { useVendorAuth } from "../../../contexts/VendorAuthContext";

export default function ChatsPage() {
  const { vendor } = useVendorAuth();

  const { loading, error, data } = useQuery(GET_VENDOR_MESSAGES, {
    variables: { vendorId: vendor?.id },
    pollInterval: 5000, // Poll every 5 seconds for new messages
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading chats: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <ChatList chats={data.getVendorChats} />
    </div>
  );
}
