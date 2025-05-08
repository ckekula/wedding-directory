"use client";

import { useQuery } from "@apollo/client";
import { GET_VENDOR_MESSAGES } from "@/graphql/queries";
import ChatList from "../../../components/chat/VendorChatList";
import { useVendorAuth } from "../../../contexts/VendorAuthContext";

export default function ChatsPage() {
  const { vendor } = useVendorAuth();

  const { loading, error, data } = useQuery(GET_VENDOR_MESSAGES, {
    variables: { vendorId: vendor?.id },
    pollInterval: 5000,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 rounded-lg bg-red-50 border border-red-200">
        <p className="font-medium">Error loading chats: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 font-title">
          My Conversations
        </h3>
      </div>
      <ChatList chats={data.getVendorChats} />
    </div>
  );
}
