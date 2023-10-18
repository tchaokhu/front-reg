import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ResetPassForm = () => {
  const [errors, setErrors] = useState(null)
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login/reset-password-request', {
        email: email
      });
      if (response.status === 200) {
        navigate('/otp', { state: { data: email } })
      }
    } catch (err) {
      setErrors("Not Found Email");
    }
  };
  return (

    <form className="login-form" onSubmit={handleSubmit}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email"
        className="form-control-example"

      >
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FloatingLabel>
      <br />
      <div  style={{ paddingTop: 20 }}>
        {errors && (<p style={{ color: 'red' }}>{errors}</p>)}

      </div>
      <div className="text-center">
        <Button id="custom-button" variant="warning" type="submit">Reset password</Button>{' '}
      </div>

    </form>
  );
}

export default ResetPassForm


