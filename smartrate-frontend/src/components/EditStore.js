import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditStore({ storeId, onUpdated }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      const token = localStorage.getItem('access');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`http://127.0.0.1:8000/api/stores/${storeId}/`, config);
      setName(res.data.name);
      setDesc(res.data.description);
    };
    fetchStore();
  }, [storeId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', desc);
    if (image) {
      formData.append('image', image);
    }

    // Add owner ID if required by your serializer
    const userId = parseInt(localStorage.getItem('user_id')); // or get from token
    formData.append('owner', userId);
    


    try {
      await axios.put(`http://127.0.0.1:8000/api/stores/${storeId}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Updated!');
      if (onUpdated) onUpdated();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Error: ' + JSON.stringify(error.response?.data));
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-2 border p-4 mb-4 rounded shadow">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Store name"
        className="border p-2 w-full"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}

export default EditStore;
