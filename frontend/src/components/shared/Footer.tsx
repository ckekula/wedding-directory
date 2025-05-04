import React from "react";
import { Button } from "../ui/button";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Description */}
          <div className="hidden md:block">
            <h3 className="text-lg md:text-xl font-bold font-title mb-2">Say I Do</h3>
            <p className="text-xs md:text-sm font-body">
              Say I Do is your one-stop destination for all wedding planning
              needs. From finding the perfect venue to hiring the best vendors,
              we make sure your big day is as magical and stress-free as
              possible. Explore our handpicked marketplace, manage your budget,
              and check off your wedding to-do list with ease. Start planning
              the wedding of your dreams today.
            </p>
          </div>
          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div>
              <h4 className="text-md md:text-lg font-semibold font-title mb-2">
                Navigate
              </h4>
              <ul className="text-xs md:text-sm font-body space-y-1">
                <li>
                  <Link href="/" className="hover:text-orange">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange">
                    Checklist
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange">
                    Budget
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md md:text-lg font-semibold font-title mb-2">About</h4>
              <ul className="text-xs md:text-sm font-body space-y-1">
                <li>
                  <Link href="/about" className="hover:text-orange">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    // href="/privacy-policy"
                    href="#"
                    target="_blank"
                    className="hover:text-orange"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    // href="/terms-of-use"
                    href="#"
                    target="_blank"
                    className="hover:text-orange"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Call to Action */}
          <div>
            <h4 className="text-md md:text-lg font-semibold font-title mb-2">
              Are you a wedding service provider?
            </h4>
            <p className="text-xs md:text-sm font-body mb-4">
              Work with us to find more couples and help them make their big
              day unforgettable!
            </p>
            {/* Redirect to visitor signup */}
            <Link href="https://tally.so/r/nGBVMp" target="_blank">
              <Button className="font-body font-bold w-full md:w-auto sm:w-fit" variant="signup"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </div>
        <hr className="border-t border-black pt-4" />
        <div className="flex flex-col md:flex-row justify-between items-center my-4 space-y-4 md:space-y-0">
          <p className="font-body text-xs md:text-sm text-center md:text-left">
            &copy; 2025 All Rights Reserved by The Team Say I Do
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-orange">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-black hover:text-orange">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="text-black hover:text-orange">
              <AiFillInstagram size={20} />
            </a>
            <a href="#" className="text-black hover:text-orange">
              <FaPinterest size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
