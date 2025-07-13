import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', password: '', role: 'user'
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/register/', form);
    alert('Registered! Please login.');
    navigate('/');
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <select name="role" value={form.role} onChange={handleChange} className="border p-2 mb-2 w-full">
        <option value="user">Normal User</option>
        <option value="store_owner">Store Owner</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
      <Link to="/login" className="block text-center text-blue-600 mt-2">Back to Login</Link>
    </form>
  );
}

export default Register;
