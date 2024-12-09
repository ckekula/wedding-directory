import React from "react";
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
}

const ContactPage: React.FC = () => {
  return (
    <div className="bg-lightYellow font-body min-h-screen flex flex-col">
      <Header />

      <div className=" container py-8 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          <div className="flex flex-col mb-8">
            <h2 className="font-title text-5xl font-bold mb-2 text-center">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-center">
              We&apos;re here to assist you with any questions or concerns.
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col xl:flex-row justify-center items-center md:space-x-8 space-y-4 xl:space-y-0 text-gray-700 text-lg">
            <div className="flex items-center space-x-2">
              <FiMail className="text-orange text-3xl" size={25} />
              <span>help@sayido.lk</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiPhone className="text-orange text-3xl" size={25} />
              <span>+94 47 786 4913</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiMapPin className="text-orange text-3xl" size={25} />
              <span>Hapugala,Galle, Sri Lanka</span>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full">
          <ContactInfo />
        </div>

        <div className="mt-8">
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
