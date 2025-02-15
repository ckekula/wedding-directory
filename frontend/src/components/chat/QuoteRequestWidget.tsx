import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CHAT, SEND_MESSAGE } from "@/graphql/mutations";
import { GET_VISITOR_BY_ID } from "@/graphql/queries";
import { useAuth } from "@/contexts/VisitorAuthContext";

interface QuoteRequestWidgetProps {
  vendorId: string;
}

const QuoteRequestWidget = ({ vendorId }: QuoteRequestWidgetProps) => {
  const { visitor } = useAuth();
  const [message, setMessage] = useState("");
  const [createChat] = useMutation(CREATE_CHAT);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data: visitorData } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await createChat({
        variables: {
          visitorId: visitor?.id,
          vendorId,
        },
      });

      console.log("Chat created response:", data);

      if (data?.createChat?.id) {
        const messageResponse = await sendMessage({
          variables: {
            chatId: data.createChat.id,
            content: message,
            visitorSenderId: visitor?.id,
          },
        });
        console.log("Message sent response:", messageResponse);
        setMessage("");
      }
    } catch (error) {
      console.log("Request payload:", {
        visitorId: visitor?.id,
        vendorId,
        message,
      });
      console.error("Error details:", error);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Request Quote</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <p className="mt-1 p-2 bg-gray-50 rounded">
            {`${visitorData?.findVisitorById?.visitor_fname || "he"} & ${
              visitorData?.findVisitorById?.partner_fname || "she"
            }`}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 p-2 bg-gray-50 rounded">
            {visitorData?.findVisitorById?.email}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Wedding Date
          </label>
          <p className="mt-1 p-2 bg-gray-50 rounded">
            {new Date(
              visitorData?.findVisitorById?.wed_date
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Type your inquiry here..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Request Quote
        </button>
      </form>
    </div>
  );
};

export default QuoteRequestWidget;
