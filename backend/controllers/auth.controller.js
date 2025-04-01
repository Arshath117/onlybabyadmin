import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../mail/mail.js';
import dotenv from 'dotenv';

dotenv.config();

// Accessing user credentials from environment variables
const email = process.env.ADMIN_EMAIL;
const name = process.env.ADMIN_USER;
const password = process.env.ADMIN_PASSWORD;

// In-memory store for OTPs
const otpStore = new Map();
const OTP_EXPIRATION_TIME = 1 * 60 * 1000; // 1 minute

export const login = async (req, res) => {
  console.log("login received")
  const { email: enteredEmail, password: enteredPassword } = req.body;


  // Validate credentials against environment variables
  if (enteredEmail !== email || enteredPassword !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ email, name }, 'secretKey', { expiresIn: '1h' });

  // Generate and send OTP
  await generateAndSendOtp(email, name);

  // Respond with the token and success message
  return res.status(200).json({
    message: 'Login successful, OTP sent to your email',
    token,
  });
};

export const verifyOtp = async (req, res) => {
  const { email: enteredEmail, enteredOtp } = req.body;

  if (enteredEmail !== email) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  if (!otpStore.has(email)) {
    return res.status(400).json({ message: 'OTP has not been generated or expired' });
  }

  const { otp, timestamp } = otpStore.get(email);

  // Check if OTP has expired
  const currentTime = Date.now();
  if (currentTime - timestamp > OTP_EXPIRATION_TIME) {
    otpStore.delete(email); // Remove expired OTP
    return res.status(400).json({ message: 'OTP has expired' });
  }

  // Check if OTP matches
  if (enteredOtp !== otp.toString()) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // OTP is valid
  otpStore.delete(email); // Remove OTP after successful verification
  return res.status(200).json({ message: 'OTP verified successfully' });
};

export const resendOtp = async (req, res) => {
  const { email: enteredEmail } = req.body;
 
  if (enteredEmail !== email) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Generate and send a new OTP
  await generateAndSendOtp(email, name);

  return res.status(200).json({ message: 'New OTP has been sent to your email' });
};

// Helper function to generate and send OTP
const generateAndSendOtp = async (email, name) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  otpStore.set(email, { otp, timestamp: Date.now() }); // Store OTP with timestamp

  console.log(`Generated OTP for ${email}: ${otp}`); // Log for debugging (remove in production)
  await sendVerificationEmail(email, name, otp); // Send OTP to user's email
};
