import { useQuery, useMutation } from "@apollo/client";
import { GET_CHAT_HISTORY } from "@/graphql/queries";
import { SEND_MESSAGE } from "@/graphql/mutations";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { IoSend } from "react-icons/io5";
import { FaStore, FaUserCircle } from "react-icons/fa";

interface Message {
  content: string;
  senderId: string;
  senderType: string;
  timestamp: string;
}

interface VisitorChatWindowProps {
  chatId: string;
}

const VisitorChatWindow = ({ chatId }: VisitorChatWindowProps) => {
  const [message, setMessage] = useState("");
  const { visitor } = useAuth();

  const { data, loading, refetch } = useQuery(GET_CHAT_HISTORY, {
    variables: { chatId },
    skip: !chatId,
    pollInterval: 1000,
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage({
        variables: {
          chatId,
          content: message,
          visitorSenderId: visitor?.id,
        },
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  const messages = data?.getChatHistory?.messages || [];

   return (
     <div className="flex flex-col h-[600px]">
       <div className="flex-1 overflow-y-auto p-6 space-y-4">
         {messages.map((message: Message, index: number) => (
           <div
             key={index}
             className={`flex items-end gap-2 ${
               message.senderType === "visitor"
                 ? "flex-row-reverse"
                 : "flex-row"
             }`}
           >
             <div className="w-8 h-8 flex items-center justify-center bg-accent/10 rounded-full">
               {message.senderType === "visitor" ? (
                 <FaUserCircle className="text-lg text-accent" />
               ) : (
                 <FaStore className="text-lg text-accent" />
               )}
             </div>
             <div
               className={`max-w-[70%] ${
                 message.senderType === "visitor" ? "items-end" : "items-start"
               }`}
             >
               <div
                 className={`px-4 py-3 rounded-2xl ${
                   message.senderType === "visitor"
                     ? "bg-accent text-white rounded-br-none"
                     : "bg-gray-100 text-gray-900 rounded-bl-none"
                 }`}
               >
                 <p className="leading-relaxed font-body">{message.content}</p>
                 <span
                   className={`text-[10px] mt-1 block font-body group-hover:opacity-100 transition-opacity ${
                     message.senderType === "visitor"
                       ? "text-white/70"
                       : "text-gray-500"
                   }`}
                 >
                   {formatDistanceToNow(new Date(message.timestamp), {
                     addSuffix: true,
                   })}
                 </span>
               </div>
             </div>
           </div>
         ))}
       </div>

       <div className="border-t p-4 bg-white font-body">
         <form onSubmit={handleSendMessage} className="flex gap-2">
           <input
             type="text"
             value={message}
             onChange={(e) => setMessage(e.target.value)}
             placeholder="Type your message..."
             className="flex-1 font-body px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
           />
           <button
             type="submit"
             disabled={!message.trim()}
             className="p-2 rounded-full bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
           >
             <IoSend className="text-lg" size={23} />
           </button>
         </form>
       </div>
     </div>
   );
};

export default VisitorChatWindow;