import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";


function OTPVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = "onlybaby7999@gmail.com";
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // Timer for resend OTP

  // Handle countdown timer for Resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer); // Cleanup timer
    }
  }, [resendTimer]);

  const handleChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    if (sanitizedValue.length <= 6) {
      setOtp(sanitizedValue);
    }
  };

  const handleKeyDown = (e) => {
    if (["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
      return;
    }
    if (otp.length >= 6 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleOtpSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("https://onlybabyadmin-1.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          enteredOtp: otp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully!");
        setLoading(false);
        navigate("/");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("An error occurred during OTP verification");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://onlybabyadmin-1.onrender.com/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("A new OTP has been sent to your email.");
        setResendTimer(30); // Reset the resend timer
      } else {
        toast.error(data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error during resending OTP:", error);
      toast.error("An error occurred while resending OTP.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full mb-4">
            <Mail className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
        </div>

        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={otp}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter OTP"
            required
            maxLength={6}
            autoComplete="one-time-code"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-center text-lg tracking-wider"
          />

          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-600">
              Resend OTP in <span className="font-medium">{resendTimer}s</span>
            </p>
          ) : (
            <button
              type="button" // Prevent form submission
              onClick={handleResendOtp}
              // disabled={loading}
              className="text-sm text-blue-500 font-medium hover:underline focus:outline-none"
            >
              Resend OTP
            </button>
          )}
          <p className="text-sm text-gray-600 mt-2">
            OTP sent to: <span className="font-medium text-gray-800">{email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
