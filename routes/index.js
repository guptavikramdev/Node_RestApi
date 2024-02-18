import express from "express";
import { authHandler as auth } from "../middleware";
const router = express.Router();

import { authController } from "../controller";
import { userController } from "../controller";
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/me", auth, userController.me);
export default router;
