import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Col, Row } from "react-bootstrap";
import log from '../../assets/img/log.svg'

const LoginForm = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [remainingTime, setRemainingTime] = useState(60);
  const [formData, setFormData] = useState({
    username: '', // Changed from email
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    function profile(token) {
      navigate(`/profile/${token}`);
    }

    try {
      setError(null);
      const response = await axios.post('http://localhost:8080/api/v1/login', formData);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        const token = response.data;

        if (token === 'Reset password') {
          setError('Reset password');
        } else if (token === 'Account is locked') {
          setError('Account is locked');
        } else {
          profile(token);
        }
      } else {
        setError('Username or password incorrect')
        setCount((prevAttempts) => prevAttempts + 1);

      }

    } catch (error) {
      setError('Username or password incorrect');
      setCount((prevAttempts) => prevAttempts + 1);

    }


    if (count >= 5) {
      setButtonDisabled(true);

      try {
        const response = await axios.post('http://localhost:8080/api/v1/login/lock', {
          username: formData.username
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (buttonDisabled) {
      const timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          setButtonDisabled(false);
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [buttonDisabled, remainingTime]);


  return (
    <form className='container' onSubmit={handleSubmit}>
      <Row>
        <Col >
          <div >
            <div className='container2' >
              <p style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 30 }}>Sign In</p>
            </div>

            <div className='container' >
              <TextField label="Username" variant="standard" type="email" name="username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className='container2'>
              <TextField label="Password" variant="standard" type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            {error && (<div className='container' style={{ paddingTop: 20 }}>
              <p style={{ color: 'red' }}>{error}</p>
            </div>)}

            <div className='container' style={{ paddingBottom: 20 }}>
              <Button variant="contained" type="submit" disabled={buttonDisabled}>Login</Button>
            </div>

            {buttonDisabled && <div className='container' style={{ paddingBottom: 20 }}>Time remaining: {remainingTime} seconds</div>}

            <div>
              <span className="container2" style={{ fontSize: 20 }}>Need an account?
                <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Register</span></span>

              <p> <span className='container2' onClick={() => navigate('/reset-password')} style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: 20 }}>Reset password</span> </p>
            </div>

            <div>
              <img src={log} alt='bg'/>
            </div>
          </div>
        </Col>
      </Row>

    </form>
  );
};

export default LoginForm;
