import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import {
  getUserForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", isLoggedIn, getUserForSidebar);
router.get("/:id", isLoggedIn, getMessages);
router.post("/send/:id", isLoggedIn, sendMessage);

export default router;
