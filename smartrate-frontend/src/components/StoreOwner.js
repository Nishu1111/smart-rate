import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function StoreOwnerPage() {
  const [stores, setStores] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState(null);

  const token = localStorage.getItem('access');
  const userId = parseInt(localStorage.getItem('user_id'));

  const fetchMyStores = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.get('http://127.0.0.1:8000/api/stores/', config);
    const myStores = res.data
      .filter(store => store.owner === userId)
      .map(store => ({
        ...store,
        products: store.products || [],
        newProductName: '',
        newProductPrice: '',
        newProductDiscount: ''
      }));
    setStores(myStores);
  };

  useEffect(() => {
    fetchMyStores();
  }, []);

  const handleAddStore = async () => {
    const formData = new FormData();
    formData.append('name', newName);
    formData.append('description', newDesc);
    formData.append('owner', userId);
    if (newImage) {
      formData.append('image', newImage);
    }

    await axios.post('http://127.0.0.1:8000/api/stores/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    alert('Store added!');
    setNewName('');
    setNewDesc('');
    setNewImage(null);
    fetchMyStores();
  };

  const handleAddProduct = async (store) => {
    await axios.post('http://127.0.0.1:8000/api/products/', {
      store: store.id,
      name: store.newProductName,
      price: store.newProductPrice,
      discount: store.newProductDiscount
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert('Product added!');
    fetchMyStores();
  };

  return (
    <div className="p-8">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">
        Welcome Store Owner, {localStorage.getItem('username')}
      </h2>

      {/* Add New Store */}
      <div className="mb-8 p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Add New Store</h3>
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
      </div>

      {/* List Your Stores */}
      <h3 className="text-xl mb-4">Your Stores</h3>
      {stores.map(store => (
        <div key={store.id} className="border p-4 mb-6 rounded shadow">
          <h4 className="text-lg font-semibold">{store.name}</h4>
          <p>{store.description}</p>
          {store.image && (
            <img
              src={store.image}
              alt="Store"
              className="w-40 h-40 object-cover rounded my-2"
            />
          )}

          <Link
            to={`/edit-store/${store.id}`}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 inline-block mb-4"
          >
            Edit Store
          </Link>

          {/* Add Product */}
          <h5 className="font-semibold mb-2">Add Product</h5>
          <input
            type="text"
            placeholder="Product name"
            value={store.newProductName}
            onChange={e => {
              const updatedStores = stores.map(s =>
                s.id === store.id ? { ...s, newProductName: e.target.value } : s
              );
              setStores(updatedStores);
            }}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={store.newProductPrice}
            onChange={e => {
              const updatedStores = stores.map(s =>
                s.id === store.id ? { ...s, newProductPrice: e.target.value } : s
              );
              setStores(updatedStores);
            }}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Discount %"
            value={store.newProductDiscount}
            onChange={e => {
              const updatedStores = stores.map(s =>
                s.id === store.id ? { ...s, newProductDiscount: e.target.value } : s
              );
              setStores(updatedStores);
            }}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={() => handleAddProduct(store)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
          >
            Add Product
          </button>

          {/* Products List */}
          <h5 className="font-semibold mb-2">Products</h5>
          {store.products && store.products.length > 0 ? (
            store.products.map(product => (
              <div
                key={product.id}
                className="border p-2 mb-2 rounded bg-gray-50"
              >
                {product.name} — ${product.price} — Discount: {product.discount}%
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default StoreOwnerPage;
