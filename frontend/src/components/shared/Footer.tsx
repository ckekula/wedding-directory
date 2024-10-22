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
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Brand Description */}
          <div>
            <h3 className="text-xl font-bold font-title mb-2">Say I Do</h3>
            <p className="text-sm font-body">
              Say I Do is your one-stop destination for all wedding planning
              needs. From finding the perfect venue to hiring the best vendors,
              we make sure your big day is as magical and stress-free as
              possible. Explore our handpicked marketplace, manage your budget,
              and check off your wedding to-do list with ease. Start planning
              the wedding of your dreams today.
            </p>
          </div>
          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold font-title mb-2">
                Navigate
              </h4>
              <ul className="text-sm font-body">
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
              <h4 className="text-lg font-semibold font-title mb-2">About</h4>
              <ul className="text-sm font-body">
                <li>
                  <Link href="/about" className="hover:text-orange">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="hover:text-orange"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-use"
                    target="_blank"
                    className="hover:text-orange"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Call to Action */}
          <div>
            <h4 className="text-lg font-semibold font-title mb-2">
              Are you a wedding service provider?
            </h4>
            <p className="text-sm font-body mb-4">
              Work with us to find more couples and help them to make their big
              day unforgettable!
            </p>
            <Link href="/sign-up" className="font-body font-bold">
              <Button className="font-body font-bold" variant="signup">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
        <hr className="border-t border-black pt-4" />
        <div className="flex justify-between items-center my-4">
          <p className="font-body">All Copyrights Reserved by The Team Say I Do - &copy;2024</p>
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-orange">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-black hover:text-orange">
              <FaXTwitter size={24} />
            </a>
            <a href="#" className="text-black hover:text-orange">
              <AiFillInstagram size={24} />
            </a>
            <a href="#" className="text-black hover:text-orange">
              <FaPinterest size={24} />
            </a>
          </div>
          {/* Copyright Information */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
