// store owner page
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StoreOwnerPage() {
  const [stores, setStores] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState(null);

  const fetchMyStores = async () => {
    const token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.get('http://127.0.0.1:8000/api/stores/', config);
    const myStores = res.data.filter(store => store.owner === parseInt(localStorage.getItem('user_id')));
    setStores(myStores);
  };
  

  useEffect(() => {
    fetchMyStores();
  }, []);

  const handleAddStore = async () => {
    const token = localStorage.getItem('access');
    const formData = new FormData();
    formData.append('name', newName);
    formData.append('description', newDesc);
    if (newImage) {
      formData.append('image', newImage);
    }
    formData.append('owner', parseInt(localStorage.getItem('user_id')));
    await axios.post('http://127.0.0.1:8000/api/stores/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Store added!');
    fetchMyStores();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Welcome Store Owner, {localStorage.getItem('role')}</h2>

      <h3 className="text-xl mb-2">Add New Store</h3>
      <input
        placeholder="Store name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={newDesc}
        onChange={(e) => setNewDesc(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="file"
        onChange={(e) => setNewImage(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleAddStore}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Store
      </button>

      <h3 className="text-xl mt-6 mb-2">Your Stores</h3>
      {stores.map(store => (
        <div key={store.id} className="border p-4 mb-4 rounded shadow">
          <h4 className="text-lg font-semibold">{store.name}</h4>
          <p>{store.description}</p>
          {store.image && (
            <img src={`http://127.0.0.1:8000${store.image}`} alt="store" className="h-40 my-2" />
          )}
          {/* TODO: Add Reviews Section */}
          <p className="text-gray-600">Ratings coming next...</p>
        </div>
      ))}
    </div>
  );
}

export default StoreOwnerPage;
