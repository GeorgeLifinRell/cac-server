import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/index.js";
import { otpLimiter } from "../middleware/rateLimitter.mjs";
import { sendOTP } from "../utils/sendOTP.js";
import { generateOTP } from "../utils/generateOTP.js";

dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const
      user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
});

router.post("/forgot-password", otpLimiter, async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTP();
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await sendOTP(email, otp);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});