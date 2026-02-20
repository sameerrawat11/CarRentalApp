import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

// Initialize Express App
const app = express();

// Connect Database
await connectDB();

// ✅ Proper CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://veloraw-suiq.onrender.com"
  ],
  credentials: true
}));

// Middleware
app.use(express.json());

app.get('/', (req, res) => res.send("Server is running"));

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));