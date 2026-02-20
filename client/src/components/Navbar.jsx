import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-black text-white border-b border-gray-800 relative"
    >
      {/* Logo */}
      <Link to="/">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-yellow-500">Velo</span>RAW
        </h1>
      </Link>

      {/* Menu */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 right-0 
        flex flex-col sm:flex-row items-start sm:items-center gap-6 
        max-sm:p-6 transition-all duration-300 z-40 bg-black 
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="hover:text-yellow-500 transition duration-300"
          >
            {link.name}
          </Link>
        ))}

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
            onClick={() =>
              isOwner ? navigate("/owner") : changeRole()
            }
            className="hover:text-yellow-500 transition"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>

          <button
  onClick={() => {
    if (user) {
      logout();
    } else {
      setOpen(false);      // 🔥 CLOSE MOBILE MENU
      setShowLogin(true);  // 🔥 OPEN LOGIN MODAL
    }
  }}
  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all"
>
  {user ? "Logout" : "Login"}
</button>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button
        className="sm:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="invert"
        />
      </button>
    </motion.div>
  );
};

export default Navbar;
