import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
 
// Middleware function to protect routes by verifying a JSON Web Token (JWT) and attaching the user to the request object
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
 
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.id).select("-password"); // not to send password to the client
 
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
 
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};