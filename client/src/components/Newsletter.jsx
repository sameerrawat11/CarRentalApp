import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="max-w-7xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#111] 
        border border-gray-800 rounded-3xl px-8 md:px-16 py-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Stay Ahead with <span className="text-yellow-500">Veloraw</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Get exclusive offers, early access to new luxury vehicles,
          and premium member-only discounts delivered straight to your inbox.
        </p>

        <form className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full sm:flex-1 px-6 py-3 rounded-lg 
            bg-black border border-gray-700 text-white 
            focus:outline-none focus:border-yellow-500 transition"
          />

          <button
            type="submit"
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 
            text-black font-semibold rounded-lg transition-all"
          >
            Subscribe
          </button>
        </form>
      </motion.div>

    </section>
  );
};

export default Newsletter;
