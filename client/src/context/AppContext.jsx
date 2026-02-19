import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // 🔥 Set token properly (IMPORTANT FIX)
  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    axios.defaults.headers.common["Authorization"] = newToken;
  };

  // Fetch User
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      }
    } catch (error) {
      console.log("User fetch failed");
    }
  };

  // Fetch Cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      toast.error("Failed to load cars");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
    navigate("/");
  };

  // 🔥 When token changes → fetch user
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      fetchUser();
    }
  }, [token]);

  // Fetch cars on app load
  useEffect(() => {
    fetchCars();
  }, []);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken: saveToken,   // 👈 IMPORTANT CHANGE
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
