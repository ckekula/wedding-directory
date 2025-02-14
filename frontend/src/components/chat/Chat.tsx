import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000/chat", {
  transports: ["websocket"],
  withCredentials: true,
});

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Join a test room
    socket.emit("joinRoom", "testRoom");

    // Listen for new messages
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      console.log("Received message:", msg);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      chatId: "testRoom",
      visitorSenderId: "testVisitor",
      content: message,
    });
    setMessage("");
  };

  return (
    <div className="p-4">
      <div className="mb-4 h-60 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
              className="border p-2 mr-2"
              
          />
          
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2">
        Send
      </button>
    </div>
  );
};

export default Chat;
