//login page
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
      console.log(response.data); //verify to get user_id

    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('user_id', response.data.user_id);
    localStorage.setItem('username', response.data.username);


    //Role-based Redirect page
    if (response.data.role === 'admin') {
      navigate('/dashboard');
    } else if (response.data.role === 'store_owner') {
      navigate('/storeowner');
    } else {
      navigate('/userpage');
    }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-xl mb-4">Sign in</h2>
      <input name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-2 w-full" />
      <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
      <Link to="/register" className="block text-center text-blue-600 mt-2">Create an account</Link>
    </form>
    </div>
  );
}

export default Login; 

    


  

  
