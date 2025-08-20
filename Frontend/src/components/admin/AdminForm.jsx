import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleToggleForm = () => setIsLogin(!isLogin);

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/admin/login", {
        email,
        password,
      });
      alert("Login successful");
      navigate("/admindashboard");
    } catch (error) {
      alert("Login failed! Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3030/admin/signup", {
        name,
        email,
        password,
      });
      alert("Admin Account Created Successfully");
      setIsLogin(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className="flex w-full h-screen bg-black text-white items-center justify-center">
      <div className="p-6 rounded-xl shadow-lg w-[400px]">
        {isLogin ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                required
                className="input"
                placeholder="s@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="block mt-4 mb-2">Password</label>
              <input
                type="password"
                required
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-white text-black mt-6 py-2 rounded-lg"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-sm text-center">
              New admin?{" "}
              <span
                onClick={handleToggleForm}
                className="text-blue-400 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Admin Signup</h1>
            <p className="text-sm mb-6">Create an admin account</p>
            <form onSubmit={handleSignup}>
              <label className="block mt-4 mb-2">Name</label>
              <input
                type="text"
                required
                className="input"
                placeholder="scooby"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label className="block mt-4 mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="s@example.com"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="block mt-4 mb-2">Password</label>
              <input
                type="password"
                required
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-white mt-6 py-2 rounded-lg text-black"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-sm text-center">
              Already an admin?{" "}
              <span
                onClick={handleToggleForm}
                className="text-blue-400 cursor-pointer"
              >
                Log in
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminForm;
