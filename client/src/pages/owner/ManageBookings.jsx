import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ManageBookings = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      data.success
        ? setBookings(data.bookings)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post(
        "/api/bookings/change-status",
        { bookingId, status }
      );

      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="w-full px-4 md:px-8 py-8 text-white">

      <Title
        title="Manage Bookings"
        subTitle="Track customer bookings, approve or cancel requests."
      />

      <div className="mt-8 space-y-5">

        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                <img
                  src={booking.car.image}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div>
                  <p className="font-semibold text-lg">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-400">
                    {booking.car.category}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {booking.pickupDate.split("T")[0]} →{" "}
                    {booking.returnDate.split("T")[0]}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col md:items-end gap-3">

                <p className="text-yellow-400 font-bold text-lg">
                  {currency}{booking.price}
                </p>

                {booking.status === "pending" ? (
                  <select
                    onChange={(e) =>
                      changeBookingStatus(
                        booking._id,
                        e.target.value
                      )
                    }
                    value={booking.status}
                    className="bg-black border border-gray-700 text-white px-4 py-2 rounded-lg focus:border-yellow-500 outline-none text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                ) : (
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {booking.status}
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

export default ManageBookings;