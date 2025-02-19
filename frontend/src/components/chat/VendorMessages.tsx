"use client";

import { useQuery } from "@apollo/client";
import { GET_VENDOR_CHAT } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import VendorHeader from "@/components/shared/Headers/VendorHeader";
import Link from "next/link";

interface Chat {
  id: string;
  visitor: {
    name: string;
  };
  lastMessage: {
    content: string;
  };
  updatedAt: string;
}

const VendorMessages = () => {
  const { vendor } = useVendorAuth();
  const { data, loading } = useQuery(GET_VENDOR_CHAT, {
    variables: { vendorId: vendor?.id },
    skip: !vendor?.id,
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-lightYellow">
      <VendorHeader />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 font-title">Messages</h1>
        <div className="bg-white rounded-lg shadow">
          {data?.vendorChats?.map((chat: Chat) => (
            <Link href={`/vendor-dashboard/messages/${chat.id}`} key={chat.id}>
              <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{chat.visitor.name}</p>
                    <p className="text-sm text-gray-500">
                      {chat.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {!data?.vendorChats?.length && (
            <div className="p-4 text-center text-gray-500">No messages yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorMessages;
