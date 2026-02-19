import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl mx-auto rounded-3xl overflow-hidden 
      bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] 
      border border-gray-800 px-8 md:px-14 py-16 
      flex flex-col md:flex-row items-center justify-between gap-10"
    >
      {/* Left Content */}
      <div className="text-white max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
          Own a Premium Car?
        </h2>

        <p className="mt-4 text-gray-400">
          Partner with <span className="text-yellow-500 font-semibold">Veloraw</span> 
          and turn your luxury vehicle into a steady income stream.
        </p>

        <p className="mt-2 text-gray-500">
          We handle bookings, verification, secure payments, and customer support —
          so you earn effortlessly while we manage everything.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 
          text-black font-semibold rounded-lg transition-all"
        >
          List Your Car
        </motion.button>
      </div>

      {/* Right Image */}
      <motion.img
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        src={assets.banner_car_image}
        alt="Luxury Car"
        className="max-h-64 object-contain"
      />
    </motion.div>
  );
};

export default Banner;
