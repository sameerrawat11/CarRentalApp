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

  // 🔥 Razorpay Payment Function
  const handlePayment = async (booking) => {
    try {
      const { data } = await axios.post("/api/payment/create-order", {
        amount: booking.price,
      });

      const options = {
        key: "rzp_test_SI7HBDlVY0JL6T", // replace with your public key
        amount: data.amount,
        currency: data.currency,
        name: "VeloRaw",
        description: "Car Booking Payment",
        order_id: data.id,
        handler: async function (response) {
          toast.success("Payment Successful!");
          await fetchMyBookings(); // refresh bookings
        },
        theme: {
          color: "#facc15",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-20">

      <Title
        title="My Bookings"
        subTitle="View and manage your car bookings"
        align="left"
      />

      <div className="mt-12 space-y-10">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-lg bg-white/5 border border-gray-700 
                       rounded-2xl p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              {/* Car Info */}
              <div>
                <img
                  src={booking.car.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <p className="text-xl font-semibold">
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className="text-gray-400 mt-1">
                  {booking.car.year} • {booking.car.category} • {booking.car.location}
                </p>
              </div>

              {/* Booking Details */}
              <div className="md:col-span-2 space-y-4">
                <p className="text-gray-400">
                  {booking.pickupDate.split("T")[0]} →{" "}
                  {booking.returnDate.split("T")[0]}
                </p>

                {/* ✅ Status Badge */}
                {booking.status === "paid" && (
                  <span className="bg-green-600 text-white px-4 py-2 rounded">
                    Paid
                  </span>
                )}

                {booking.status === "pending" && (
                  <span className="bg-yellow-600 text-white px-4 py-2 rounded">
                    Pending
                  </span>
                )}
              </div>

              {/* Price & Payment */}
              <div className="flex flex-col justify-between text-right">
                <div>
                  <p className="text-gray-400">Total Price</p>
                  <h1 className="text-3xl font-bold text-yellow-500">
                    {currency}{booking.price}
                  </h1>
                </div>

                {/* ✅ Show Pay Now ONLY if Pending */}
                {booking.status === "pending" && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 
                               text-black font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Pay Now
                  </button>
                )}

                {/* ✅ Show Paid Badge if Paid */}
                {booking.status === "paid" && (
                  <span className="bg-green-500 text-white text-sm py-1 px-3 rounded-full">
                    Paid
                  </span>
                )}

              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;