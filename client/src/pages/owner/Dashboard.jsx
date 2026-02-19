import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 flex-1 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white">

      <Title
        title="Admin Dashboard"
        subTitle="Monitor platform performance, bookings, revenue & activities"
      />

      {/* 🔥 Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/5 border border-gray-700 
            rounded-2xl p-6 flex items-center justify-between 
            hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div>
              <p className="text-gray-400 text-sm">{card.title}</p>
              <h1 className="text-3xl font-bold mt-2 text-yellow-500">
                {card.value}
              </h1>
            </div>

            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <img src={card.icon} alt="" className="h-6 w-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-8 mt-14">

        {/* Recent Bookings */}
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-gray-700 rounded-2xl p-8 shadow-xl">
          <h1 className="text-xl font-semibold text-yellow-500">
            Recent Bookings
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Latest customer bookings
          </p>

          {data.recentBookings.length === 0 && (
            <p className="text-gray-500">No recent bookings found.</p>
          )}

          {data.recentBookings.map((booking, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-4 border-b border-gray-700 last:border-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <p className="font-medium">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-400">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-yellow-500 font-semibold">
                  {currency}
                  {booking.price}
                </p>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Monthly Revenue */}
        <div className="backdrop-blur-xl bg-white/5 border border-gray-700 rounded-2xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h1 className="text-xl font-semibold text-yellow-500">
              Monthly Revenue
            </h1>
            <p className="text-gray-400 text-sm">
              Revenue for current month
            </p>
          </div>

          <div className="mt-10">
            <p className="text-5xl font-bold text-yellow-500">
              {currency}
              {data.monthlyRevenue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
