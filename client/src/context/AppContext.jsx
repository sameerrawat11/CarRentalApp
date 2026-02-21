import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common["Cache-Control"] = "no-cache";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // 🔥 Restore token on reload
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  // ✅ Fetch User
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      }
    } catch (error) {
      setUser(null);
      setIsOwner(false);
    }
  };

  // ✅ 🔥 IMPROVED FETCH CARS
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars", {
        headers: { "Cache-Control": "no-cache" },
      });

      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      console.log("Car fetch error:", error.response?.data || error.message);
      toast.error("Failed to load cars");
    }
  };

  // When token changes → fetch user
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  // 🔥 Auto refresh cars when token available
  useEffect(() => {
    fetchCars();
  }, [token]); // important change

  const logout = () => {
    localStorage.removeItem("token");
    setTokenState(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
    navigate("/");
  };

  const value = {
    navigate,
    currency,
    axios,
    user,
    token,
    setToken,
    isOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
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