import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);

export default router;
