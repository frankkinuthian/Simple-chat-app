import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

// app config
// remove app and replace with server from socket.js to listen using socket.io

// env config
dotenv.config();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// api routes

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// listen
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
