import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [role, setRole] = useState('');
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [rating, setRating] = useState({ store: '', score: 5, comment: '' });

  // ✅ Fetch stores + ratings
  const fetchData = async () => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const storesRes = await axios.get('http://127.0.0.1:8000/api/stores/', config);
    const ratingsRes = await axios.get('http://127.0.0.1:8000/api/ratings/', config);
    setStores(storesRes.data);
    setRatings(ratingsRes.data);
  };

  // ✅ Decode role from JWT + fetch data
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setRole(payload.role);
    }
    fetchData();
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/';
  };

  // ✅ Add Store
  const handleAddStore = async () => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.post('http://127.0.0.1:8000/api/stores/', { name: storeName }, config);
    setStoreName('');
    fetchData();
  };

  // ✅ Add Rating
  const handleAddRating = async () => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.post('http://127.0.0.1:8000/api/ratings/', rating, config);
    setRating({ store: '', score: 5, comment: '' });
    fetchData();
  };

  // ✅ Export CSV
  const exportCSV = () => {
    window.open('http://127.0.0.1:8000/api/export-csv/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Show role */}
      <p className="mb-4">Logged in as: <span className="font-semibold">{role}</span></p>

      {/* Store CRUD */}
      {(role === 'admin' || role === 'store_owner') && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add Store</h2>
          <div className="flex">
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Store Name"
              className="border p-2 flex-grow"
            />
            <button
              onClick={handleAddStore}
              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            >
              Add Store
            </button>
          </div>
        </div>
      )}

      {/* Stores List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Stores</h2>
        <ul className="list-disc list-inside">
          {stores.map((store) => (
            <li key={store.id}>{store.name}</li>
          ))}
        </ul>
      </div>

      {/* Rating form for normal users */}
      {role === 'user' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add Rating</h2>
          <div className="flex flex-col space-y-2">
            <select
              value={rating.store}
              onChange={(e) => setRating({ ...rating, store: e.target.value })}
              className="border p-2"
            >
              <option value="">Select Store</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              max="5"
              value={rating.score}
              onChange={(e) => setRating({ ...rating, score: e.target.value })}
              placeholder="Score (1-5)"
              className="border p-2"
            />

            <input
              type="text"
              value={rating.comment}
              onChange={(e) => setRating({ ...rating, comment: e.target.value })}
              placeholder="Comment"
              className="border p-2"
            />

            <button
              onClick={handleAddRating}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Rating
            </button>
          </div>
        </div>
      )}

      {/* Ratings List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ratings</h2>
        <ul className="list-disc list-inside">
          {ratings.map((r) => (
            <li key={r.id}>
              Store ID: {r.store} | Score: {r.score} | Comment: {r.comment}
            </li>
          ))}
        </ul>
      </div>

      {/* CSV Export */}
      <button
        onClick={exportCSV}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Download CSV
      </button>
    </div>
  );
}

export default Dashboard;
