import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { fetchUser } from './utils/fetchUser';
import Register from './pages/Register';
import axios from 'axios';
import api from './api/apiConfig';


function App() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //     const user = fetchUser();

  //     if (!user) navigate('/login')
  // }, [])

  const getUserData = async (movieId) => {
    console.log(movieId);
     
    try 
    {
        const response = await api.get(`/api/v1/login/${movieId}`);

        

    } 
    catch (error) 
    {
      console.error("getMovieData"+error);
    }

  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/profile/:token" element={<Home user={getUserData}/>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
