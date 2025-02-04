import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as a cookie in the response
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", // prevents CORS attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
