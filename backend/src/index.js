import express from "express";
import authRoutes from "../routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";

// app config
const app = express();

// env config
dotenv.config();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cookieParser());

// api routes

app.use("/api/auth", authRoutes);

// listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
