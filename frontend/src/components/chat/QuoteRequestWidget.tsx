'use client';
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CHAT, SEND_MESSAGE } from "@/graphql/mutations";
import { GET_VISITOR_BY_ID } from "@/graphql/queries";
import { useAuth } from "@/contexts/VisitorAuthContext";
import Link from "next/link";
import { Confetti } from "@/components/ui/confetti";
import toast from "react-hot-toast";
import { useVendorAuth } from "@/contexts/VendorAuthContext";

interface QuoteRequestWidgetProps {
  vendorId: string;
  offeringId: string;
}

const QuoteRequestWidget = ({ vendorId,offeringId }: QuoteRequestWidgetProps) => {
  const { visitor } = useAuth();
  const [message, setMessage] = useState("");
  const [createChat] = useMutation(CREATE_CHAT);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { vendor } = useVendorAuth();
  
  const isVendorsOffering = vendorId === vendor?.id;

  const { data: visitorData } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!visitor?.id) {
      toast.error("Please log in as a visitor to send a quote request");
      return;
    }

    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      // Create chat
      const chatResponse = await createChat({
        variables: {
          visitorId: visitor.id,
          offeringId: offeringId,
        },
      });

      const chatId = chatResponse.data?.createChat?.chatId;

      if (!chatId) {
        throw new Error("Failed to create chat - no chat ID returned");
      }

      // Send message
      const messageResponse = await sendMessage({
        variables: {
          chatId: chatId,
          content: message,
          visitorSenderId: visitor.id,
          vendorSenderId: null  // Add this line since it's optional
        }
      });

      if (messageResponse.data?.sendQuoteMessage) {
        toast.success("Quote request sent successfully!");
        // Reset form
        setMessage("");
        setShowSuccess(true); // Show success modal and confetti
      }
    } catch (error) {
      toast.error("Failed to send quote request. Please try again.");
      console.error("Error in quote request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const visitorInfo = visitorData?.findVisitorById;
  const fullName = `${visitorInfo?.visitor_fname || "he"} & ${
    visitorInfo?.partner_fname || "she"
  }`;
  const weddingDate = visitorInfo?.wed_date
    ? new Date(visitorInfo.wed_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not set";

  return (
    <>
      {showSuccess && <Confetti />}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        {isVendorsOffering ? (
          // 👇 VENDOR VIEW
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold font-title text-gray-800">
              View your quotes
            </h3>
            <p className="text-gray-600">
              Couples can request quotes here. You can view their messages in your dashboard.
            </p>
            <Link
              href={`/vendor-dashboard/chats`}
              className="inline-block bg-orange text-white py-2 px-4 rounded-lg mt-4 hover:bg-white hover:text-orange hover:border-orange border-2 transition"
            >
              Go to your Inbox
            </Link>
          </div>
        ) : (
          // 👇 VISITOR VIEW (original form)
          <>
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-title text-gray-800">
                  Get Your Personalized Quote
                </h3>
                <p className="text-gray-600 mt-2">
                  We&apos;ll get back to you within 24 hours
                </p>
              </div>

              {/* User Info Card */}
              <div className="shadow-md bg-slate-50 p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <span className="text-orange text-lg font-semibold">
                      {fullName.split(" ")[0]?.[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{fullName}</p>
                    <p className="text-gray-500 text-sm">{visitorInfo?.email}</p>
                    <p className="text-gray-500 text-sm">
                      Wedding Date: {weddingDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-slate-600 resize-none transition-all duration-200"
                    rows={5}
                    placeholder="Tell us about your wedding plans and what you're looking for..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange hover:bg-white hover:text-orange hover:border-2 hover:border-orange text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Quote Request"
                  )}
                </button>
              </form>

              {/* Footer Note */}
              <p className="text-center text-gray-500 text-sm mt-4">
                By sending this request, you&apos;ll create a conversation with
                the vendor
              </p>
            </div>
          </>
        )}
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 relative animate-in fade-in slide-in-from-bottom duration-300">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600">
                Your quote request has been sent. You can view and manage all
                your conversations in your dashboard.
              </p>
              <div className="space-y-3 pt-4">
                <Link
                  href={`/visitor-dashboard/chats/${visitor?.id}`}
                  className="block w-full bg-orange hover:bg-white hover:text-orange hover:border-2 hover:border-orange text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  View My Messages
                </Link>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteRequestWidget;
