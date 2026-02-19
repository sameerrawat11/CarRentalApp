import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 mt-40 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            <span className="text-yellow-500">Velo</span>raw
          </h2>

          <p className="mt-4 text-sm leading-relaxed">
            Veloraw is a premium car rental platform delivering
            luxury, performance, and seamless booking experiences
            across India.
          </p>

          <div className="flex gap-4 mt-6">
            {[assets.facebook_logo, assets.instagram_logo, assets.twitter_logo].map(
              (logo, i) => (
                <a key={i} href="#">
                  <img
                    src={logo}
                    alt="social"
                    className="w-5 h-5 opacity-70 hover:opacity-100 transition"
                  />
                </a>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/" className="hover:text-yellow-500 transition">Home</a></li>
            <li><a href="/cars" className="hover:text-yellow-500 transition">Browse Cars</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">List Your Car</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-yellow-500 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Insurance</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>Veloraw HQ</li>
            <li>New Delhi, India</li>
            <li>+91 98765 43210</li>
            <li>support@veloraw.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Veloraw. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
