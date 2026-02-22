import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) setCars(data.cars);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      setLoadingId(carId);

      setCars((prev) =>
        prev.map((car) =>
          car._id === carId
            ? { ...car, isAvaliable: !car.isAvaliable }
            : car
        )
      );

      const { data } = await axios.post("/api/owner/toggle-car", { carId });

      if (!data.success) {
        toast.error(data.message);
        fetchOwnerCars();
      }
    } catch (error) {
      toast.error(error.message);
      fetchOwnerCars();
    } finally {
      setLoadingId(null);
    }
  };

  const deleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirmDelete) return;

    try {
      setLoadingId(carId);

      const { data } = await axios.post("/api/owner/delete-car", { carId });

      if (data.success) {
        setCars((prev) => prev.filter((car) => car._id !== carId));
        toast.success(data.message);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (isOwner) fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="w-full px-4 md:px-10 py-10 text-white">

      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update details, or remove them."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block rounded-2xl border border-gray-800 
                        bg-gradient-to-br from-gray-900 to-black 
                        overflow-hidden shadow-xl">

          <table className="w-full text-left text-sm">
            <thead className="bg-black border-b border-gray-800 text-gray-400">
              <tr>
                <th className="p-4">Car</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car) => (
                <tr
                  key={car._id}
                  className="border-t border-gray-800 hover:bg-gray-900 transition"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={car.image}
                      alt=""
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-xs text-gray-500">
                        {car.seating_capacity} Seats • {car.transmission}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 text-gray-400">
                    {car.category}
                  </td>

                  <td className="p-4 font-semibold text-yellow-500">
                    {currency}{car.pricePerDay}/day
                  </td>

                  <td className="p-4">
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

                  <td className="p-4">
                    <ActionButtons
                      car={car}
                      loadingId={loadingId}
                      toggleAvailability={toggleAvailability}
                      deleteCar={deleteCar}
                      assets={assets}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARD VIEW ================= */}
        <div className="grid gap-6 md:hidden">
          {cars.map((car) => (
            <div
              key={car._id}
              className="rounded-2xl border border-gray-800 
                         bg-gradient-to-br from-gray-900 to-black 
                         p-5 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={car.image}
                  alt=""
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-sm text-gray-400">
                    {car.category}
                  </p>
                  <p className="text-yellow-500 font-semibold mt-1">
                    {currency}{car.pricePerDay}/day
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    car.isAvaliable
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {car.isAvaliable ? "Available" : "Unavailable"}
                </span>

                <ActionButtons
                  car={car}
                  loadingId={loadingId}
                  toggleAvailability={toggleAvailability}
                  deleteCar={deleteCar}
                  assets={assets}
                />
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};

const ActionButtons = ({ car, loadingId, toggleAvailability, deleteCar, assets }) => (
  <div className="flex items-center gap-4">
    <button
      disabled={loadingId === car._id}
      onClick={() => toggleAvailability(car._id)}
      className="w-10 h-10 flex items-center justify-center 
                 rounded-full bg-gray-800 hover:bg-yellow-500/20 transition group"
    >
      <img
        src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
        alt=""
        className="w-5 h-5 filter invert group-hover:invert-0 transition"
      />
    </button>

    <button
      disabled={loadingId === car._id}
      onClick={() => deleteCar(car._id)}
      className="w-10 h-10 flex items-center justify-center 
                 rounded-full bg-gray-800 hover:bg-red-500/20 transition group"
    >
      <img
        src={assets.delete_icon}
        alt=""
        className="w-5 h-5 filter invert group-hover:invert-0 transition"
      />
    </button>
  </div>
);

export default ManageCars;