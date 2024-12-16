import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Use login from useAuth
  const navigate = useNavigate();

  const handleSubmit= (e) => {
    e.preventDefault();
    // Dummy login logic (replace with your API call)
    if(email === "admin@gmail.com" && password === "12345678"){
      login('token'); // Set token and update state
      navigate("/"); // Redirect to home
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo and Name Section */}
      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-blue-600">Only4Baby</div>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
