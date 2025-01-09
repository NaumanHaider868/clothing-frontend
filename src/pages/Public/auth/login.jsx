import React, { useState } from "react";
import "../../../assets/css/auth.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center auth login">
      <div className="navbar">
        <div className="logo">
          <i></i>
        </div>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 m-auto text-center">
        <h2 className="text-[30px] font-semibold">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-4 outline-none bg-transparent b-bottom"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-4 outline-none bg-transparent b-bottom"
          />

          <button
            type="submit"
            className="w-full py-4 bg-[#D9D9D9] hover:bg-[#c7c5c5] transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="hover:underline cursor-pointer">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
