import React, { useState } from 'react';
import axios from 'axios';

function AddStore() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const token = localStorage.getItem('access');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', desc);
    formData.append('image', image);

    await axios.post('http://127.0.0.1:8000/api/stores/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    alert('Store added!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow">
      <input
        type="text"
        placeholder="Store Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Store
      </button>
    </form>
  );
}

export default AddStore;
