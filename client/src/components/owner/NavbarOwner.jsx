import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between 
    px-8 md:px-12 py-5 
    bg-gradient-to-r from-black via-gray-900 to-black 
    border-b border-gray-800 text-white">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        <span className="text-yellow-500">Velo</span>RAW
      </Link>

      {/* Welcome Text */}
      <p className="text-gray-400">
        Welcome,{" "}
        <span className="text-yellow-500 font-semibold">
          {user?.name || "Owner"}
        </span>
      </p>

    </div>
  );
};

export default NavbarOwner;
