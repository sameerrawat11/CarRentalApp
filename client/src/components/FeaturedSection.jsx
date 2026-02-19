import React from "react";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <section className="w-full">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Featured <span className="text-yellow-500">Vehicles</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Discover our hand-picked premium cars designed to deliver
          performance, comfort, and unforgettable driving experiences.
        </p>
      </motion.div>

      {/* Cars Grid */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16"
      >
        {cars.slice(0, 6).map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center mt-16"
      >
        <button
          onClick={() => {
            navigate("/cars");
            scrollTo(0, 0);
          }}
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all"
        >
          Explore All Cars
        </button>
      </motion.div>

    </section>
  );
};

export default FeaturedSection;
