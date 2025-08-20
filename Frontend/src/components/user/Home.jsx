import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const text = "Nexcode";

  const isLoggedIn = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/user/checkSession",
        {
          withCredentials: true,
        }
      );
      return response.data.status;
    } catch (error) {
      return false;
    }
  };

  const handleNavigation = async (e) => {
    e.preventDefault();
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
      navigate("/dashboard");
    } else {
      alert("You need to log in first!");
      navigate("/form");
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center font-custom overflow-hidden">
      <div className="navbar w-full p-5 overflow-hidden flex justify-between items-center z-10">
        <div className="logo h-10 w-10 bg-white rounded-lg flex justify-center items-center text-black font-bold">
          <p>{`</>`}</p>
        </div>
        <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-red-500 to-blue-500">
          <div className="pages font-semibold flex items-center justify-between text-white w-58 gap-10 px-8 rounded-xl bg-black p-2">
            <Link to="/features" className="relative group cursor-pointer">
              <span className="text-xs font-medium uppercase">Features</span>
              <span className="underline"></span>
            </Link>
            <Link to="/about" className="relative group cursor-pointer">
              <span className="text-xs font-medium uppercase">About</span>
              <span className="underline"></span>
            </Link>
          </div>
        </div>

        <Link
          to="/form"
          className="login flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 "
        >
          <GoArrowUpRight size={25} color="black" />
        </Link>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-6xl font-extrabold text-gray-200 drop-shadow-[3px_3px_0px_#7C3AED]">
          Welcome to
        </h1>

        <p className="mt-4 text-sm text-zinc-500 font-semibold max-w-xl mx-auto">
          Your one-stop platform for coding, collaboration, and innovation.{" "}
          <br />
          NexCode empowers developers to build, share, and grow together in a
          seamless environment.
        </p>
      </div>

      <div className="absolute bottom-5 flex justify-center w-full px-4">
        <button
          onClick={handleNavigation}
          className="relative p-[1px] font-semibold rounded-lg transition-all duration-300 bg-black group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg p-[2px]"></span>
          <span className="relative z-10 block bg-black px-6 py-3 rounded-lg text-sm sm:text-base text-center">
            GET STARTED
          </span>
        </button>
      </div>
      <div className="h-full w-full absolute flex justify-center items-center font-extrabold text-[320px] tracking-tighter text-gray-300 drop-shadow-[6px_6px_0px_#7C3AED] transition-opacity duration-500">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="transition-all duration-300 text-gray-200 hover:text-violet-600 hover:drop-shadow-[6px_6px_0px_#FAFAFA]"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
