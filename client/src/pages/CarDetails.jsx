import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();

  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  return car ? (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 md:px-16 lg:px-24 xl:px-32 py-16">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-10 text-gray-400 hover:text-yellow-500 transition"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-60" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-8"
        >

          {/* Car Image */}
          <div className="rounded-3xl overflow-hidden bg-white/5 border border-gray-800 shadow-2xl">
            <img
              src={car.image}
              alt=""
              className="w-full h-[420px] object-contain p-10"
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-gray-400 mt-2">
              {car.category} • {car.year}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="bg-white/5 border border-gray-800 hover:border-yellow-500 transition rounded-2xl p-6 flex flex-col items-center"
              >
                <img src={icon} alt="" className="h-6 mb-3 opacity-80" />
                <p className="text-gray-300 text-center">{text}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white/5 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-500">
              Description
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white/5 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-500">
              Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "360 Camera",
                "Bluetooth",
                "GPS",
                "Heated Seats",
                "Rear View Mirror",
              ].map((item) => (
                <li key={item} className="flex items-center text-gray-400">
                  <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* RIGHT BOOKING CARD */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="sticky top-28 h-max backdrop-blur-xl bg-white/5 border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6"
        >

          <p className="text-3xl font-bold text-yellow-500 flex justify-between">
           {car.pricePerDay} RS
            <span className="text-base text-gray-400 font-normal">/day</span>
          </p>

          {/* Pickup */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Pickup Date</label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="bg-black border border-gray-700 px-4 py-3 rounded-xl text-white focus:border-yellow-500 outline-none"
            />
          </div>

          {/* Return */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Return Date</label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              required
              className="bg-black border border-gray-700 px-4 py-3 rounded-xl text-white focus:border-yellow-500 outline-none"
            />
          </div>

          {/* Button */}
          <button className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition-all">
            Book Now
          </button>

          <p className="text-center text-sm text-gray-500">
            No credit card required to reserve
          </p>

        </motion.form>

      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
