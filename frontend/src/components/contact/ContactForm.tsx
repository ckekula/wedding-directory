import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ContactForm: React.FC = () => {
  return (
    <section className="bg-white rounded-lg shadow-md py-12 container">
      <h3 className="font-title text-2xl md:text-4xl mb-8 text-center ">
        Please fill out the form below and we will get back to you as soon as
        possible.
      </h3>
      <form className="space-y-8 flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <Input
            type="text"
            id="name"
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <Input
            type="email"
            id="email"
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="subject" className="font-bold">
            Subject
          </label>
          <Input
            type="text"
            id="subject"
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Subject"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="font-bold">
            Message
          </label>
          <textarea
            id="message"
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Your Message"
            rows={5}
            required
          />
        </div>

        <Button type="submit" variant="signup" className=" justify-center ">
          Send Message
        </Button>
      </form>
    </section>
  );
};

export default ContactForm;
