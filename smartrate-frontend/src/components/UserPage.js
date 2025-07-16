//user page
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function UserPage() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchStores = async () => {
      const token = localStorage.getItem('access');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('http://127.0.0.1:8000/api/stores/', config);
      setStores(res.data);
    };

    fetchStores();
  }, []);

  const handleRate = async (storeId) => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.post('http://127.0.0.1:8000/api/ratings/', {
      store: storeId,
      score: ratings[storeId],
      comment: comments[storeId],
    }, config);
    alert('Rating submitted!');
    setRatings({ ...ratings, [storeId]: '' });
    setComments({ ...comments, [storeId]: '' });
  };

  return (
    <div className="p-8">
        <Navbar />
      <h2 className="text-2xl font-bold mb-4">Welcome, {localStorage.getItem('role')}</h2>
      <h3 className="text-xl mb-4">Browse Stores & Rate</h3>

      {stores.map(store => (
        <div key={store.id} className="border p-4 mb-4 rounded shadow">
          <h4 className="text-lg font-semibold">{store.name}</h4>
          <p>{store.description}</p>
          {store.image && (
            <img src={store.image} alt="store" className="h-40 my-2" />
          )}

          <div className="mt-2">
            <label className="block">Score (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={ratings[store.id] || ''}
              onChange={e => setRatings({ ...ratings, [store.id]: e.target.value })}
              className="border p-1 w-20"
            />

            <label className="block mt-2">Comment:</label>
            <textarea
              value={comments[store.id] || ''}
              onChange={e => setComments({ ...comments, [store.id]: e.target.value })}
              className="border p-2 w-full"
            ></textarea>

            <button
              onClick={() => handleRate(store.id)}
              className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
            >
              Submit Rating
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPage;
