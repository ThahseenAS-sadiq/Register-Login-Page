import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NetflixImage from "../assets/images/netflix-bg-image1.jpg";
import NetflixLogo from "../assets/images/Logonetflix.png";

const Home = ({ user, setUser, error }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={NetflixImage}
          alt="Netflix Background"
        />
      </div>

      {/* Dark Overlay */}
      <div className="bg-black/65 absolute inset-0 z-20">
        {/* Netflix Logo */}
        <img
          className="absolute top-4 left-4 w-[35%] md:w-40"
          src={NetflixLogo}
          alt="Netflix Logo"
        />

        {/* Top Buttons */}
        <div className="absolute top-0 right-4 flex items-center z-30">
          <button className="py-2 px-4 m-4 rounded bg-white/30 hover:bg-white/20">
            English
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="py-2 px-4 m-4 rounded bg-[#E50914] hover:bg-[#be0912]"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="py-2 px-4 m-4 rounded bg-[#E50914] hover:bg-[#be0912]"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Centered Content (Headline + Card) */}
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 z-20 px-4 text-center">
          {/* Headline Section */}
          <div className="max-w-lg mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Unlimited movies, shows, and more
            </h1>
            <p className="text-xl md:text-xl mb-4">
              Starts at ₹149. Cancel at any time.
            </p>
            <p className="text-md md:text-base">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
          </div>

          {/* Center Card */}
          <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-md text-center border border-white/30">
            {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

            {user ? (
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome, {user.username}
                </h2>
                <p className="mb-6">Email: {user.email}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
                <p className="mb-5">Please log in or register to continue.</p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/login"
                    className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;




