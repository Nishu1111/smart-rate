
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to SmartRate!</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl text-center">
        SmartRate is a store rating platform with role-based dashboards.
        Admins manage users, Store Owners manage their stores, and Users submit ratings and comments.
        All data can be exported for analysis in Power BI, Tableau, or Excel.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          Sign In
        </Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
