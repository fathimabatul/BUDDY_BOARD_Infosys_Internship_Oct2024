import express from "express";
import {
  signUp,
  signIn,
  verifyEmail,
  sendPasswordResetEmail,
  resetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/verifyEmail/:token", verifyEmail);
router.post("/sendPasswordResetEmail", sendPasswordResetEmail);
router.put("/resetPassword/:token", resetPassword);

export default router;
