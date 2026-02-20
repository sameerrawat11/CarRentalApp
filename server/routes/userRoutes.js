import express from "express";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userRouter = express.Router();

// ✅ Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ==========================
// Normal Auth Routes
// ==========================
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getCars);

// ==========================
// ✅ Google Login Route
// ==========================
userRouter.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token missing",
      });
    }

    // 🔐 Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    // 🔎 Check if user exists
    let user = await User.findOne({ email: payload.email });

    // 🆕 Create user if not exists
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        password: "google-oauth-user", // dummy password
      });
    }

    // 🎟 Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token: jwtToken,
      user,
    });

  } catch (error) {
    console.error("Google Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
});

export default userRouter;