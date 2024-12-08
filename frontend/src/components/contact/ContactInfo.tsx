import React from "react";
import { FiMail, FiClock, FiPhone } from "react-icons/fi";

const ContactInfo: React.FC = () => {
  return (
    <div className="flex  bg-white shadow-lg rounded-lg py-8 ">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center container w-full justify-center">
        {/* Email Section */}
        <div className="p-6 border w-full md:w-[300px] border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <FiMail className="text-4xl text-orange mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Email Us</h3>
          <p className="text-gray-600">help@sayido.lk</p>
        </div>

        {/* Customer Service Hours Section */}
        <div className="p-6 border w-full md:w-[300px] border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <FiClock className="text-4xl text-orange mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Customer Service Hours</h3>
          <p className="text-gray-600">10:00 AM to 6:00 PM (EST)</p>
          <p className="text-gray-600">Monday-Friday (excluding holidays)</p>
        </div>

        {/* Live Chat Section */}
        <div className="p-6 border w-full md:w-[300px] border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <FiPhone className="text-4xl text-orange mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Live Chat</h3>
          <p className="text-gray-600">Need immediate assistance?</p>
          <p className="text-gray-600">Chat with our support team!</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
