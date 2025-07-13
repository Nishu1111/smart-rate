import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };
  

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-xl mb-4">Sign in</h2>
      <input name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-2 w-full" />
      <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
      <Link to="/register" className="block text-center text-blue-600 mt-2">Create an account</Link>
    </form>
  );
}

export default Login;
