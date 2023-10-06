import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/apiConfig';
import axios from 'axios';

const Home = () => {
  let { token } = useParams();
  const [user, setUser] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);
  const [formData, setFormData] = useState({
    username: '', // Changed from email
    password: '',
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(`/api/v1/login/${token}`);
        console.log(response.data.appUser);
        setUser(response.data);
      } catch (error) {
        console.error("getUserData" + error);
      }
    };

    getUserData();
  }, []);

  const toggleTables = (email) => {
    setToggleTable(!toggleTable);
    // You don't need to set formData.username here.
    try {
      console.log(formData);
      const response = axios.get('http://localhost:8080/api/v1/login/log', {
        params: {
          username: email,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error("Can't fetch log");
      }
    } catch (error) {
      console.error("getLog" + error);
    }
  };

  const handleLogout = (username,password) => {
    // You don't need to set formData.username here.
    try {
      const response = axios.post('http://localhost:8080/api/v1/auth/logout', {
        username:username,
        password:password
        // If needed, you can include the password here.
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error("Can't log out");
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      Home
      {user && (
        <div>
          <p>User ID: {user.appUser.id}</p>
          <p>User Name: {user.appUser.email} {user.appUser.password}</p>
          <button onClick={() => toggleTables(user.appUser.username)}>Show Log</button>
          <button onClick={() => handleLogout(user.appUser.username,user.appUser.password)}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
