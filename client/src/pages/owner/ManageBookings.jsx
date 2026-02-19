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
    <div className="w-full px-6 md:px-10 py-10 text-white">

      <Title
        title="Manage Bookings"
        subTitle="Track customer bookings, approve or cancel requests."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black overflow-hidden shadow-xl"
      >

        <table className="w-full text-left text-sm">

          {/* TABLE HEADER */}
          <thead className="bg-black border-b border-gray-800 text-gray-400">
            <tr>
              <th className="p-4 font-medium">Car</th>
              <th className="p-4 font-medium max-md:hidden">Date Range</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium max-md:hidden">Payment</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
                {/* Car */}
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.car.category}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="p-4 text-gray-400 max-md:hidden">
                  {booking.pickupDate.split("T")[0]} →{" "}
                  {booking.returnDate.split("T")[0]}
                </td>

                {/* Price */}
                <td className="p-4 font-semibold text-yellow-500">
                  {currency}{booking.price}
                </td>

                {/* Payment */}
                <td className="p-4 max-md:hidden">
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300">
                    Offline
                  </span>
                </td>

                {/* Status */}
                <td className="p-4">
                  {booking.status === "pending" ? (
                    <select
                      onChange={(e) =>
                        changeBookingStatus(
                          booking._id,
                          e.target.value
                        )
                      }
                      value={booking.status}
                      className="bg-black border border-gray-700 text-white px-3 py-1.5 rounded-lg focus:border-yellow-500 outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </motion.div>
    </div>
  );
};

export default ManageBookings;
