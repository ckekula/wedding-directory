"use client";
import { useQuery } from "@apollo/client";
import { GET_VENDOR_CHATS } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import VendorHeader from "@/components/shared/Headers/VendorHeader";
import Link from "next/link";
import Image from "next/image";

const MessagesPage = () => {
  const { vendor } = useVendorAuth();
  const { data, loading } = useQuery(GET_VENDOR_CHATS, {
    variables: { vendorId: vendor?.id },
    skip: !vendor?.id,
  });

  const chats = data?.getVendorChats || [];

  return (
    <div>
      <VendorHeader />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 font-title">Messages</h1>
        <div className="bg-white rounded-lg shadow">
          {chats.map((chat: any) => (
            <Link href={`/vendor-dashboard/messages/${chat.id}`} key={chat.id}>
              <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/profilePic.webp"
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{chat.visitor.email}</p>
                    <p className="text-sm text-gray-500">
                      {chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1].content
                        : "No messages yet"}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {chats.length === 0 && (
            <div className="p-8 text-center text-gray-500">No messages yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
