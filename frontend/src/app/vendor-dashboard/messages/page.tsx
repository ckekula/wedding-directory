"use client";

import Chat from "../../../components/chat/Chat";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/VisitorAuthContext";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";

const ChatPage = () => {
  const params = useParams();
  const vendorId = Array.isArray(params.vendorId) ? params.vendorId[0] : params.vendorId;
  const { visitor } = useAuth();

  if (!visitor) {
    return <LoaderHelix />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Chat visitorId={visitor.id} vendorId={vendorId} />
    </div>
  );
};

export default ChatPage;
