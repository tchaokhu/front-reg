import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { fetchUser } from './utils/fetchUser';
import Register from './pages/Register';
import axios from 'axios';
import api from './api/apiConfig';
import ResetPw from './pages/ResetPw';
import Otp from './pages/Otp';
import ConfirmPassword from './pages/ConfirmPassword';
import Reset from './pages/Reset';
import ChangePassword from './pages/ChangePassword';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      navigate('/login');}
    // console.log(user);
    }, []);


  const getUserData = async (token) => {
    console.log(token);
    try {
      const response = await api.get(`/api/v1/login/${token}`);
    }
    catch (error) {
      console.error("getMovieData" + error);
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:token" element={<Home user={getUserData} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<Reset />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/confirm-password/:username" element={<ChangePassword />} />
    </Routes>
    
  );
}

export default App;
