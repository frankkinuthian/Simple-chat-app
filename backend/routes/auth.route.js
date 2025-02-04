import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// register
router.post("/signup", signup);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

// update user
router.put("/update", protectRoute, updateProfile);

// check auth
router.get("/check", protectRoute, checkAuth);

export default router;
