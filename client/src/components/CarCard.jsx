import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group bg-[#111] border border-gray-800 rounded-2xl overflow-hidden 
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 
      transition-all duration-500 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image}
          alt="Car"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {car.isAvaliable && (
          <p className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
            Available
          </p>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-gray-700">
          <span className="font-bold text-yellow-500 text-lg">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-gray-400"> / day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-white">
        <h3 className="text-xl font-semibold mb-1">
          {car.brand} {car.model}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {car.category} • {car.year}
        </p>

        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} alt="" className="h-4 invert opacity-70" />
            {car.seating_capacity} Seats
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} alt="" className="h-4 invert opacity-70" />
            {car.fuel_type}
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.car_icon} alt="" className="h-4 invert opacity-70" />
            {car.transmission}
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.location_icon} alt="" className="h-4 invert opacity-70" />
            {car.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
