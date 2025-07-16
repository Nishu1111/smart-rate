//Home page UI
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
           Welcome to <span className="text-purple-700">SmartRate</span>!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The smart way to rate, manage, and grow stores. <br />
          <span className="text-gray-800 font-semibold">Admin</span> control everything, 
          <span className="text-gray-800 font-semibold"> Store Owners</span> showcase their businesses, 
          and <span className="text-gray-800 font-semibold">Users</span> rate & comment with ease.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
