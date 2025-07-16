//root or main components
import logo from './logo.svg';
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserPage from './components/UserPage';
import StoreOwnerPage from './components/StoreOwner';
import EditStore from './components/EditStore';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/storeowner" element={<StoreOwnerPage />} />
        <Route path="/edit-store/:id" element={<EditStore />} />
        

      </Routes>
    </Router>
  );
}


export default App;
