import Chat from "@/components/chat/Chat";
import React from "react";

const ChatTestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Test</h1>
      <Chat />
    </div>
  );
};

export default ChatTestPage;
