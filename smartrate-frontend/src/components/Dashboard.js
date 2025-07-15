
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditStore from './EditStore';

function Dashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');

  // Fetch all Stores & Ratings
  const fetchData = async () => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const storesRes = await axios.get('http://127.0.0.1:8000/api/stores/', config);
    const ratingsRes = await axios.get('http://127.0.0.1:8000/api/ratings/', config);
  
    setStores(storesRes.data);
    setRatings(ratingsRes.data);
  };
  // delete store if needed
  const handleDelete = async (storeId) => {
    const token = localStorage.getItem('access');
    await axios.delete(`http://127.0.0.1:8000/api/stores/${storeId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Store deleted!');
    window.location.reload(); // Or refresh state
  };

  // Fetch all Users (Admin only)
  const fetchUsers = async () => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.get('http://127.0.0.1:8000/api/users/', config);
    setUsers(res.data);
  };

  // Toggle Active/Blocked
  const handleToggleActive = async (user) => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.put(`http://127.0.0.1:8000/api/users/${user.id}/`, {
      is_active: !user.is_active,
    }, config);
    fetchUsers();
  };

  // Make or Remove Admin
  const handleMakeAdmin = async (user) => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.put(`http://127.0.0.1:8000/api/users/${user.id}/`, {
      is_staff: !user.is_staff,
      role: !user.is_staff ? 'admin' : 'user'
    }, config);

    fetchUsers();
  };

  // CSV Export
  const exportCSV = () => {
    const token = localStorage.getItem('access');
    window.open(`http://127.0.0.1:8000/api/export-csv/?token=${token}`);
  };

  // On mount, fetch everything
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    fetchData();

    if (storedRole === 'admin') {
      fetchUsers();
    }
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* STORES */}
      <h3 className="text-xl font-semibold mb-2">Stores</h3>
      <ul className="mb-6">
        {stores.map(store => (
          <li key={store.id} className="border p-2 mb-2 rounded shadow">
            {store.name}
          </li>
        ))}
      </ul>

      {/* RATINGS */}
      <h3 className="text-xl font-semibold mb-2">Ratings</h3>
      <ul className="mb-6">
        {ratings.map(rating => (
          <li key={rating.id} className="border p-2 mb-2 rounded shadow">
            Store ID: {rating.store} - Score: {rating.score}
          </li>
        ))}
      </ul>
       <ul>
              {stores.map(store => (

                            <li key={store.id} className="border p-2 mb-2 rounded shadow">
                             <h4 className="font-bold">{store.name}</h4>

                                {/* Show the EditStore form */}
                              <EditStore
                                storeId={store.id}
                                onUpdated={() => window.location.reload()}
                               />

                               {/* Optional: Delete button */}
                                <button
                                 onClick={() => handleDelete(store.id)}
                                  className="bg-red-600 text-white px-2 py-1 rounded mt-2"
                                 >
                                   Delete
                                </button>
                            </li>
                       ))}
                    </ul>
      {/* CSV Export */}
      <button
        onClick={exportCSV}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Download CSV
      </button>

      {/* ADMIN USER MANAGEMENT */}
      {role === 'admin' && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">User Management (Admin Only)</h3>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border">
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.is_staff ? 'Admin' : 'User'}</td>
                  <td className="p-2">{user.is_active ? 'Active' : 'Blocked'}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      {user.is_active ? 'Block' : 'Unblock'}
                    </button>
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      {user.is_staff ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

