import React from "react";
import { useAppContext } from "../context/AppContext";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const Login = () => {

  const { setShowLogin, axios, setToken, fetchUser, navigate } = useAppContext();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {

      const { data } = await axios.post("/api/user/google-login", {
        token: credentialResponse.credential,
      });

      if (data.success) {

        // ✅ Save token (AppContext handles localStorage + header)
        setToken(data.token);

        // ✅ Immediately fetch user for UI update
        await fetchUser();

        setShowLogin(false);
        navigate("/");

        toast.success("Google Login Successful");

      } else {
        toast.error(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Google Login Error:", error.response?.data || error.message);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 items-center p-8 w-80 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium">
          <span className="text-primary">User</span> Login
        </p>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google Login Failed")}
        />

      </div>
    </div>
  );
};

export default Login;