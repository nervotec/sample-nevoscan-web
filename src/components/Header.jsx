import React from "react";
import logo from "../assets/images/logo.png";

const Header = () => {
  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine the greeting based on the hour
  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <header
      className="relative flex items-center justify-between w-full px-4 py-2 bg-white shadow-md sm:px-20 sm:py-4"
      style={{ boxShadow: "none" }}
    >
      <div className="flex items-center">
        <div>
          <p className="text-[10px] text-gray-500 sm:text-sm">{greeting}</p>
          <h1 className="text-sm font-semibold text-gray-800 sm:text-lg">
            Welcome Back!
          </h1>
        </div>
      </div>
      <div className="absolute transform -translate-x-1/2 left-1/2">
        <img src={logo} alt="Logo" className="h-5 w-25 sm:w-25 sm:h-7" />
      </div>

      <div className="flex items-center space-x-1 sm:space-x-4">
        <button className="relative">
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
          <svg
            className="w-4 h-4 text-gray-600 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.155V11a7.003 7.003 0 00-5-6.716V4a1 1 0 00-2 0v.284A7.003 7.003 0 006 11v3.155c0 .271-.1.526-.293.71L4 17h5m0 0a3 3 0 006 0m-6 0H9"
            ></path>
          </svg>
        </button>
        <img
          src="https://i.pravatar.cc/300"
          alt="User Avatar"
          className="object-cover w-6 h-6 rounded-full sm:w-10 sm:h-10"
        />
      </div>
    </header>
  );
};

export default Header;
