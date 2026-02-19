import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const applyFilter = () => {
    if (input === "") {
      setFilteredCars(cars);
      return;
    }

    const filtered = cars.filter((car) =>
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.category.toLowerCase().includes(input.toLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    const { data } = await axios.post(
      "/api/bookings/check-availability",
      { location: pickupLocation, pickupDate, returnDate }
    );

    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No cars available");
      }
    }
  };

  useEffect(() => {
    if (isSearchData) searchCarAvailability();
  }, []);

  useEffect(() => {
    if (!isSearchData) applyFilter();
  }, [input, cars]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Hero Section */}
      <div className="flex flex-col items-center py-24 px-6 text-center">

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Available <span className="text-yellow-500">Cars</span>
        </motion.h1>

        <p className="text-gray-400 mt-4 max-w-2xl">
          Browse our selection of premium vehicles available for your next adventure.
        </p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 w-full max-w-3xl"
        >
          <div className="flex items-center bg-white/10 backdrop-blur-lg border border-gray-700 px-6 h-14 rounded-full shadow-xl">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search by make, model, or features"
              className="w-full bg-transparent outline-none text-gray-300 placeholder-gray-500"
            />

          </div>
        </motion.div>
      </div>

      {/* Cars Grid */}
      <div className="px-6 md:px-16 lg:px-24 pb-20">

        <p className="text-gray-400 mb-6">
          Showing {filteredCars.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredCars.map((car, index) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Cars;
