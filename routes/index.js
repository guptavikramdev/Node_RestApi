import express from "express";
const router =express.Router();

import {authController} from "../controller";
import {userController} from "../controller";
router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/me',userController.me)
export default router