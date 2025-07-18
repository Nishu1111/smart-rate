// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';
  const role = localStorage.getItem('role') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide">🌟 SmartRate</div>
      <div className="space-x-4 flex items-center">
        <span className="font-medium">Hello, <b>{username}</b> ({role})👋</span>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
