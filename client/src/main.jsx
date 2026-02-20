import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AppProvider>
          <MotionConfig viewport={{ once: true }}>
            <App />
          </MotionConfig>
        </AppProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);