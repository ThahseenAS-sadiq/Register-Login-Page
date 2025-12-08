import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
connectDB();

app.use("/api/users", authRoutes);

// Optional test route
app.get("/", (req, res) => res.send("API is running"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




