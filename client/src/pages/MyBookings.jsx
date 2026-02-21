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
      key: "rzp_test_SI7HBDlVY0JL6T",
      amount: data.amount,
      currency: data.currency,
      name: "VeloRaw",
      description: "Car Booking Payment",
      order_id: data.id,

      handler: async function (response) {

        // ✅ CALL VERIFY API
        const verifyRes = await axios.post("/api/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingId: booking._id,
        });

        if (verifyRes.data.success) {
          toast.success("Payment Successful!");
          await fetchMyBookings();   // 🔥 UI refresh
        } else {
          toast.error("Payment Verification Failed");
        }
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
        {bookings.map((booking, index) => {

          // 🔥 STEP 1 — Console Check
          console.log("Booking Status:", booking.status);

          return (
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
                </div>

                {/* Price & Payment */}
                <div className="flex flex-col justify-between text-right">
                  <div>
                    <p className="text-gray-400">Total Price</p>
                    <h1 className="text-3xl font-bold text-yellow-500">
                      {currency}{booking.price}
                    </h1>
                  </div>

                  {/* 🔥 STEP 2 — Correct Condition */}
                  {booking.status === "pending" ? (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="px-6 py-3 bg-yellow-500 rounded-lg text-black font-semibold mt-4"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span className="px-6 py-3 bg-green-600 text-white rounded-lg mt-4">
                  Booking Confirmed ✅
                    </span>
                  )}

                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;