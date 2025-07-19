import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditStore() {
  const { id } = useParams(); // /edit-store/id`
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);


  
  useEffect(() => {
    // current store data
    const fetchStore = async () => {
      const token = localStorage.getItem('access');
      const res = await axios.get(`http://127.0.0.1:8000/api/stores/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName(res.data.name);
      setDescription(res.data.description);
      // image
    };
    fetchStore();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    //formData.append('owner', parseInt(localStorage.getItem('user_id')));
    if (image) {
      formData.append('image', image);
    }

    await axios.put(`http://127.0.0.1:8000/api/stores/${id}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Store updated!');
    navigate('/storeowner'); //back to storeowner 
  };
 
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Store</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Store Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows="4"
          required
        ></textarea>
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Update Store
        </button>
      </form>
    </div>
  );
}



export default EditStore;
