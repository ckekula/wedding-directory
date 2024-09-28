import React from "react";
import { Button } from "../ui/button";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Brand Description */}
          <div>
            <h3 className="text-xl font-bold font-title mb-2">Say I Do</h3>
            <p className="text-sm font-body">
            Say I Do is your one-stop destination for all wedding planning needs. From finding the perfect venue to hiring the best vendors, we make sure your big day is as magical and stress-free as possible. Explore our handpicked marketplace, manage your budget, and check off your wedding to-do list with ease. Start planning the wedding of your dreams today.
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
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="#">Marketplace</Link>
                </li>
                <li>
                  <Link href="#">Checklist</Link>
                </li>
                <li>
                  <Link href="#">Budget</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold font-title mb-2">About</h4>
              <ul className="text-sm font-body">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
                <li>
                  <Link href="/sitemap">Sitemap</Link>
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
            <Button className="font-body font-bold" variant="signup">Register Now</Button>
          </div>
        </div>
        <hr className="border-t border-black pt-4" />
        <div className="flex flex-col justify-between items-center m-4">
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-gray-600">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaXTwitter size={24} />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <AiFillInstagram size={24} />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaPinterest size={24} />
            </a>
          </div>
          {/* Copyright Information */}
          <div className="flex-col text-sm text-black font-body text-center m-4">
            <p>All rights reserved</p>
            <p className="">Copyrights &copy;2024 sayido.lk</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
