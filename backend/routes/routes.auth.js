import express from "express";
import {
  signup,
  signin,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.post("/update-profile", isLoggedIn, updateProfile);
router.get("/check", isLoggedIn, checkAuth);

export default router;
