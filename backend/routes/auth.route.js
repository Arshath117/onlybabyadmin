import express from "express";

import { login, verifyOtp, resendOtp } from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/login",login);
// router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/resend-otp",resendOtp);


export default router;