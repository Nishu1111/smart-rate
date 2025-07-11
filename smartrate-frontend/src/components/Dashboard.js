import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const storesRes = await axios.get('http://127.0.0.1:8000/api/stores/', config);
    const ratingsRes = await axios.get('http://127.0.0.1:8000/api/ratings/', config);
    setStores(storesRes.data);
    setRatings(ratingsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

const exportCSV = () => {
  const token = localStorage.getItem('access');
  window.open(`http://127.0.0.1:8000/api/export-csv/?token=${token}`);
};

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Stores</h3>
      <ul>
        {stores.map(store => (
          <li key={store.id}>{store.name}</li>
        ))}
      </ul>

      <h3>Ratings</h3>
      <ul>
        {ratings.map(rating => (
          <li key={rating.id}>{rating.store} - {rating.score}</li>
        ))}
      </ul>

      <button onClick={exportCSV}>Download CSV</button>
    </div>
  );
}

export default Dashboard;
