import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);

      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full md:w-64 
                    bg-gradient-to-b from-black via-gray-900 to-black
                    text-gray-300 
                    flex flex-col items-center pt-10
                    border-r border-gray-800">

      {/* PROFILE SECTION */}
      <div className="relative group">

        <label htmlFor="image" className="cursor-pointer relative">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            alt=""
            className="h-16 w-16 rounded-full object-cover 
                       border-2 border-yellow-500 
                       shadow-lg"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 hidden group-hover:flex 
                          items-center justify-center 
                          bg-black/60 rounded-full transition">
            <img src={assets.edit_icon} alt="" className="w-4 h-4 invert" />
          </div>
        </label>

        {image && (
          <button
            onClick={updateImage}
            className="absolute -top-2 -right-8 
                       flex items-center gap-1 
                       px-3 py-1 text-xs 
                       bg-yellow-500 text-black 
                       rounded-full shadow-lg hover:bg-yellow-600 transition"
          >
            Save
            <img src={assets.check_icon} width={12} alt="" />
          </button>
        )}
      </div>

      <p className="mt-4 text-base font-semibold text-white max-md:hidden">
        {user?.name}
      </p>
      <p className="text-xs text-gray-500 max-md:hidden">
        Owner Panel
      </p>

      {/* MENU LINKS */}
      <div className="w-full mt-10 px-3 space-y-2">

        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname;

          return (
            <NavLink
              key={index}
              to={link.path}
              className={`relative flex items-center gap-3 
                          w-full px-4 py-3 rounded-xl 
                          transition-all duration-300 group
                          ${
                            isActive
                              ? "bg-yellow-500/10 text-yellow-400 shadow-md"
                              : "hover:bg-gray-800 hover:text-white"
                          }`}
            >
              <img
                src={isActive ? link.coloredIcon : link.icon}
                alt=""
                className="w-5 h-5 
                           ${!isActive && 'invert opacity-70'} 
                           group-hover:opacity-100 transition"
              />

              <span className="max-md:hidden font-medium tracking-wide">
                {link.name}
              </span>

              {/* Active Side Indicator */}
              {isActive && (
                <div className="absolute right-0 w-1.5 h-8 
                                bg-yellow-500 rounded-l-full"></div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto mb-6 text-xs text-gray-600">
        Veloraw © 2026
      </div>
    </div>
  );
};

export default Sidebar;
