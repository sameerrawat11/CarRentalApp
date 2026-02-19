import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="w-full px-6 md:px-10 py-10 text-white">

      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update details, or remove them."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 rounded-2xl border border-gray-800 
                   bg-gradient-to-br from-gray-900 to-black 
                   overflow-hidden shadow-xl w-full"
      >

        <table className="w-full text-left text-sm">

          {/* HEADER */}
          <thead className="bg-black border-b border-gray-800 text-gray-400">
            <tr>
              <th className="p-4 font-medium">Car</th>
              <th className="p-4 font-medium max-md:hidden">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium max-md:hidden">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
                {/* Car Info */}
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={car.image}
                    alt=""
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} Seats • {car.transmission}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="p-4 max-md:hidden text-gray-400">
                  {car.category}
                </td>

                {/* Price */}
                <td className="p-4 font-semibold text-yellow-500">
                  {currency}{car.pricePerDay}/day
                </td>

                {/* Status */}
                <td className="p-4 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      car.isAvaliable
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {car.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>

                {/* Actions */}
                {/* Actions */}
<td className="p-4">
  <div className="flex items-center gap-6">

    {/* Toggle Availability */}
    <button
      onClick={() => toggleAvailability(car._id)}
      className="w-10 h-10 flex items-center justify-center 
                 rounded-full bg-gray-800 
                 hover:bg-yellow-500/20 
                 transition duration-300 group"
    >
      <img
        src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
        alt=""
        className="w-5 h-5 
                   filter invert 
                   group-hover:invert-0 
                   transition duration-300"
      />
    </button>

    {/* Delete */}
    <button
      onClick={() => deleteCar(car._id)}
      className="w-10 h-10 flex items-center justify-center 
                 rounded-full bg-gray-800 
                 hover:bg-red-500/20 
                 transition duration-300 group"
    >
      <img
        src={assets.delete_icon}
        alt=""
        className="w-5 h-5 
                   filter invert 
                   group-hover:invert-0 
                   transition duration-300"
      />
    </button>

  </div>
</td>

              </tr>
            ))}
          </tbody>

        </table>
      </motion.div>
    </div>
  );
};

export default ManageCars;
