import React, { useState } from "react";
import { stateCityData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import heroCar from "../assets/hero-car.png";

const Hero = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const {
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate,
  } = useAppContext();

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity || !pickupDate || !returnDate) return;

    navigate(
      `/cars?pickupLocation=${selectedCity}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28">

        {/* Heading */}
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Drive the Future with{" "}
          <span className="text-yellow-500">Veloraw</span>
        </motion.h1>

        <p className="text-gray-400 max-w-2xl text-lg mt-6">
          Experience premium car rentals with unmatched performance,
          elegance, and comfort.
        </p>

        {/* Search Form */}
        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSearch}
          className="mt-14 backdrop-blur-xl bg-white/5 border border-gray-700 
          p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center 
          w-full max-w-6xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        >
          {/* State */}
          <select
            required
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
            className="w-full md:w-60 bg-black border border-gray-700 px-4 py-3 rounded-xl 
            outline-none focus:border-yellow-500 transition text-white"
          >
            <option value="">Select State</option>
            {Object.keys(stateCityData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            required
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
            className="w-full md:w-60 bg-black border border-gray-700 px-4 py-3 rounded-xl 
            outline-none focus:border-yellow-500 transition disabled:opacity-50 text-white"
          >
            <option value="">Select City</option>
            {selectedState &&
              stateCityData[selectedState].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>

          {/* Pickup Date */}
          <input
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            type="date"
            min={today}
            required
            className="w-full md:w-48 bg-black border border-gray-700 px-4 py-3 rounded-xl 
            outline-none focus:border-yellow-500 transition text-white appearance-none"
          />

          {/* Return Date */}
          <input
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            type="date"
            min={pickupDate || today}
            required
            className="w-full md:w-48 bg-black border border-gray-700 px-4 py-3 rounded-xl 
            outline-none focus:border-yellow-500 transition text-white appearance-none"
          />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 bg-yellow-500 hover:bg-yellow-600 
            text-black font-semibold rounded-xl transition-all shadow-lg"
          >
            Search Cars
          </motion.button>
        </motion.form>

        {/* STATIC PREMIUM CAR IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center mt-24"
        >
          <img
            src={heroCar}
            alt="Luxury Car"
            className="w-[900px] md:w-[1200px] object-contain 
                       drop-shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
