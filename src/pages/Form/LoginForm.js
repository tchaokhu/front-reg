import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/apiConfig'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // Changed from email
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { username, password } = formData;

    function profile (token) {
      navigate(`/profile/${token}`);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', formData);
      if (response.status === 200) {
        console.log(response.data.token);
  
        const token = response.data.token;
        profile(token);
  
      } else {
        console.error("Username or Password is incorrect")
      }
      
    } catch (error) {
      console.error('Login failed', error);

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label> {/* Changed from email */}
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
