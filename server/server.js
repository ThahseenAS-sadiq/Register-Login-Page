import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// CORS - allow your Vercel frontend
app.use(
  cors({
    origin: "https://your-frontend.vercel.app", // Replace with your actual Vercel URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Body parser
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", authRoutes);

// Root test route
app.get("/", (req, res) => res.send("API is running"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





