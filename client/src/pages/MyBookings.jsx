import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-20">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title
          title="My Bookings"
          subTitle="View and manage your car bookings"
          align="left"
        />
      </motion.div>

      <div className="mt-12 space-y-10">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-lg bg-white/5 border border-gray-700 
                       rounded-2xl p-8 shadow-xl 
                       hover:shadow-yellow-500/10 transition-all duration-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              {/* Car Info */}
              <div>
                <div className="rounded-xl overflow-hidden mb-4">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="w-full h-40 object-cover"
                  />
                </div>

                <p className="text-xl font-semibold">
                  {booking.car.brand} {booking.car.model}
                </p>

                <p className="text-gray-400 mt-1">
                  {booking.car.year} • {booking.car.category} •{" "}
                  {booking.car.location}
                </p>
              </div>

              {/* Booking Details */}
              <div className="md:col-span-2 space-y-5">

                <div className="flex items-center gap-3">
                  <p className="px-4 py-1.5 bg-white/10 rounded-full text-sm">
                    Booking #{index + 1}
                  </p>

                  <p
                    className={`px-4 py-1 text-xs rounded-full font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {booking.status}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={assets.calendar_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-400">Rental Period</p>
                    <p className="text-white">
                      {booking.pickupDate.split("T")[0]} →{" "}
                      {booking.returnDate.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={assets.location_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-400">Pick-up Location</p>
                    <p className="text-white">
                      {booking.car.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-col justify-between text-right">
                <div>
                  <p className="text-gray-400">Total Price</p>
                  <h1 className="text-3xl font-bold text-yellow-500 mt-1">
                    {currency}
                    {booking.price}
                  </h1>
                </div>

                <p className="text-gray-500 text-sm mt-6">
                  Booked on {booking.createdAt.split("T")[0]}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
