import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NetflixImage from "../assets/images/netflix-bg-image1.jpg";
import NetflixLogo from "../assets/images/Logonetflix.png";

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
      setUser(res.data.user);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Netflix Logo */}
      <img
        className="absolute top-4 left-4 w-[35%] md:w-40 z-30"
        src={NetflixLogo}
        alt="Netflix Logo"
      />

      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img
          className="w-full h-full object-cover"
          src={NetflixImage}
          alt="Netflix Background"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md border border-white/20 z-20">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Register</h1>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-white text-sm font-medium mb-1">Username</label>
            <input
              className="w-full p-3 bg-white/20 text-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 outline-none"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-white text-sm font-medium mb-1">Email</label>
            <input
              className="w-full p-3 bg-white/20 text-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 outline-none"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              className="w-full p-3 bg-white/20 text-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 outline-none"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button className="w-full bg-red-600 text-white p-3 rounded-md mt-6 hover:bg-red-700 font-medium transition-colors">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}


export default Register;