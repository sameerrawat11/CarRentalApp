import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { stateCityData } from "../../assets/assets";


const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [car, setCar] = useState({
  brand: "",
  model: "",
  year: "",
  pricePerDay: "",
  category: "",
  transmission: "",
  fuel_type: "",
  seating_capacity: "",
  state: "",          // ✅ ADD THIS
  location: "",       // city
  description: "",
});


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 md:px-12 lg:px-20 py-14">

      <div className="w-full xl:max-w-7xl mx-auto">

        <Title
          title="Add New Car"
          subTitle="Fill in car details including pricing, specs & availability."
        />

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmitHandler}
          className="mt-12 w-full backdrop-blur-xl bg-white/5 border border-gray-800 
          rounded-3xl p-12 shadow-2xl space-y-10"
        >

          {/* Image Upload */}
          <div className="flex items-center gap-8">
            <label htmlFor="car-image" className="cursor-pointer">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-black border border-gray-700 flex items-center justify-center hover:border-yellow-500 transition">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : assets.upload_icon
                  }
                  alt=""
                  className="object-contain w-full h-full"
                />
              </div>
              <input
                type="file"
                id="car-image"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <p className="text-gray-400 text-lg">
              Upload a premium image of your vehicle
            </p>
          </div>

          {/* Brand + Model */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Input label="Brand" value={car.brand} onChange={(v)=>setCar({...car, brand:v})}/>
            <Input label="Model" value={car.model} onChange={(v)=>setCar({...car, model:v})}/>
          </div>

          {/* Year / Price / Category */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Input type="number" label="Year" value={car.year} onChange={(v)=>setCar({...car, year:v})}/>
            <Input type="number" label={`Daily Price (${currency})`} value={car.pricePerDay} onChange={(v)=>setCar({...car, pricePerDay:v})}/>
            <Select
              label="Category"
              value={car.category}
              options={["Sedan", "SUV", "Van", "Luxury", "Sports"]}
              onChange={(v)=>setCar({...car, category:v})}
            />
          </div>

          {/* Transmission / Fuel / Seating */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Select
              label="Transmission"
              value={car.transmission}
              options={["Automatic", "Manual", "Semi-Automatic"]}
              onChange={(v)=>setCar({...car, transmission:v})}
            />
            <Select
              label="Fuel Type"
              value={car.fuel_type}
              options={["Petrol", "Diesel", "Electric", "Hybrid"]}
              onChange={(v)=>setCar({...car, fuel_type:v})}
            />
            <Input type="number" label="Seating Capacity" value={car.seating_capacity} onChange={(v)=>setCar({...car, seating_capacity:v})}/>
          </div>

        {/* State + City */}
<div className="grid md:grid-cols-2 gap-6">

  {/* STATE SELECT */}
  <div>
    <label className="text-gray-400 text-sm">State</label>
    <select
      required
      value={car.state}
      onChange={(e) =>
        setCar({
          ...car,
          state: e.target.value,
          location: "", // reset city when state changes
        })
      }
      className="w-full mt-2 px-4 py-3 bg-black border border-gray-700 
      rounded-xl outline-none focus:border-yellow-500 transition text-white"
    >
      <option value="">Select State</option>
      {Object.keys(stateCityData).map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  </div>

  {/* CITY SELECT */}
  <div>
    <label className="text-gray-400 text-sm">City</label>
    <select
      required
      value={car.location}
      disabled={!car.state}
      onChange={(e) =>
        setCar({
          ...car,
          location: e.target.value,
        })
      }
      className="w-full mt-2 px-4 py-3 bg-black border border-gray-700 
      rounded-xl outline-none focus:border-yellow-500 transition text-white 
      disabled:opacity-50"
    >
      <option value="">Select City</option>

      {car.state &&
        stateCityData[car.state].map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
    </select>
  </div>

</div>

          {/* Description */}
          <div>
            <label className="text-gray-400 text-sm">Description</label>
            <textarea
              rows={5}
              required
              value={car.description}
              onChange={(e)=>setCar({...car, description:e.target.value})}
              className="w-full mt-2 px-4 py-4 bg-black border border-gray-700 rounded-2xl outline-none focus:border-yellow-500 transition text-white"
            />
          </div>

          {/* Button */}
          <button
            disabled={isLoading}
            className="px-10 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-2xl transition-all"
          >
            {isLoading ? "Listing..." : "List Your Car"}
          </button>

        </motion.form>

      </div>
    </div>
  );
};


/* Input Component */
const Input = ({ label, value, onChange, type="text" }) => (
  <div>
    <label className="text-gray-400 text-sm">{label}</label>
    <input
      type={type}
      required
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full mt-2 px-4 py-4 bg-black border border-gray-700 rounded-2xl outline-none focus:border-yellow-500 transition text-white"
    />
  </div>
);

/* Select Component */
const Select = ({ label, value, options, onChange }) => (
  <div>
    <label className="text-gray-400 text-sm">{label}</label>
    <select
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-2 px-4 py-3 
      bg-black text-white
      border border-gray-700 
      rounded-xl 
      outline-none 
      focus:border-yellow-500 
      transition
      appearance-none"
    >
      <option value="" disabled>
        Select {label}
      </option>

      {options.map((opt) => (
        <option
          key={opt}
          value={opt}
          className="bg-black text-white"
        >
          {opt}
        </option>
      ))}
    </select>
  </div>
);


export default AddCar;
