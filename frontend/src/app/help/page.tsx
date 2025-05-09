import React from "react";
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Metadata } from "next";
import {
  FaQuestionCircle,
  FaEnvelope,
  FaPhoneAlt,
  
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Help & Support | Say I Do",
  description:
    "Get answers to your questions and support for planning your perfect wedding day.",
};

const Help = () => {
  return (
    <div className="bg-gradient-to-b from-lightYellow to-white font-body min-h-screen">
      <Header />

      {/* Hero Section - Removed background image */}
      <div className="bg-orange text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-title mb-4">
            Help & Support
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            Find answers to your questions or reach out for personalized
            assistance
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Introduction */}
        <div className="bg-white rounded-lg p-6 md:p-10 shadow-md mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaQuestionCircle className="text-orange text-3xl" />
            <h2 className="font-title font-bold text-2xl md:text-3xl">
              How Can We Help?
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            We&apos;re here to make your wedding planning journey as smooth as
            possible. Browse our frequently asked questions below or reach out
            directly for personalized assistance.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-lg p-6 md:p-10 shadow-md mb-8">
          <h2 className="font-title font-bold text-2xl mb-6 border-b pb-2">
            Frequently Asked Questions
          </h2>

          {/* FAQ Items - These would ideally be components with expand/collapse functionality */}
          {[
            {
              question: "How do I find vendors in my area?",
              answer:
                "Use our vendor search feature and filter by location, category, and price range to find the perfect match for your wedding needs.",
            },
            {
              question: "Can I save vendors to compare later?",
              answer:
                "Yes! Create an account to save your favorite vendors, build a comparison list, and track your planning progress.",
            },
            {
              question: "How do I contact a vendor?",
              answer:
                "Each vendor profile has direct contact options. You can message them through our platform or use their provided contact information.",
            },
            {
              question: "Are the vendor reviews verified?",
              answer:
                "We verify that reviews come from real couples who have used the vendor's services to ensure authenticity.",
            },
          ].map((faq, index) => (
            <div key={index} className="border-b last:border-0 py-4">
              <div className="flex justify-between items-center cursor-pointer group">
                <h3 className="font-semibold text-lg group-hover:text-orange transition-colors">
                  {faq.question}
                </h3>
              </div>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="bg-orange text-white p-6">
            <h2 className="font-title font-bold text-2xl mb-2">
              Still Need Help?
            </h2>
            <p>
              Our team is ready to assist you with any questions or concerns.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg text-center">
                <FaEnvelope className="text-orange text-3xl mb-3" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">
                  We&apos;ll respond within 24 hours
                </p>
                <Link
                  href="/contact"
                  className="bg-orange hover:bg-orange/90 text-white font-semibold py-2 px-6 rounded-full transition-all"
                >
                  Send a Message
                </Link>
              </div>

              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg text-center">
                <FaPhoneAlt className="text-orange text-3xl mb-3" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Mon-Fri, 9AM-6PM EST</p>
                <a
                  href="tel:+94779276997"
                  className="text-orange hover:underline font-semibold text-lg"
                >
                  +94 77 927 6997
                </a>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded text-blue-800">
              <p className="text-sm">
                For urgent wedding day assistance, please call our dedicated
                support line at
                <a
                  href="tel:+94779276997"
                  className="font-bold hover:underline"
                >
                  {" "}
                  +94 77 927 6997
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
