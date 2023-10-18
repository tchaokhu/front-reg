import React, { useState } from 'react'
import api from '../../api/apiConfig'
import { useNavigate } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import { BiUser, BiEnvelope, BiLock } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';

const RegisterForm = () => {
  const [errors, setErrors] = useState(null);
  const [errors2, setErrors2] = useState(null);
  const [errors3, setErrors3] = useState(null);
  const [ShowMessage, setShowMessage] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });



  function printStrongNess(input_string) {
    const n = input_string.length;
    // Checking lower alphabet in string
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let specialChar = false;
    const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

    for (let i = 0; i < n; i++) {
      if (input_string[i] >= "a" && input_string[i] <= "z") {
        hasLower = true;
      }
      if (input_string[i] >= "A" && input_string[i] <= "Z") {
        hasUpper = true;
      }
      if (input_string[i] >= "0" && input_string[i] <= "9") {
        hasDigit = true;
      }
      if (!normalChars.includes(input_string[i])) {
        specialChar = true;
      }
    }
    // Strength of password
    let strength = "Weak";
    if (hasLower && hasUpper && hasDigit && specialChar && n >= 8) {
      strength = "Strong";
    }

    console.log(`Strength of password: ${strength}`);
    return strength;
  }

  const resendEmali = async (e) => {
    try {
      const response = await api.post('/api/v1/registration/resend-email', formData);
      if (response.statusCode === 200) { }
      setShowMessage(true)
    } catch (err) {
      console.log(err);
    }
  }


  const handleSubmit = async (e) => {
    setErrors(null);
    setErrors2(null);
    setErrors3(null);
    e.preventDefault();
    let strength = printStrongNess(formData.password);
    if (strength === "Strong" && formData.password.length >= 8) {
      try {
        const response = await api.post('/api/v1/registration', formData);
        if (response.status === 200) {
          console.log("Successfully logged in");
          navigate('/login');

        } else {
          console.error("Successfully not logged in");
        }
        console.log(response.data);
      } catch (error) {
        // Handle errors, e.g., show an error message
        setErrors3('Email already taken');
      }
    } else {
      setErrors("Password must have A-Z, a-z,special characters and 0-9.");
    }

    if (formData.password.length < 8) {
      setErrors2("Password must be at least 8 characters");
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <form onSubmit={handleSubmit} className='register-main'>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <BiUser />
        </InputGroup.Text>
        <FormControl
          name="firstname"
          placeholder="First Name"
          aria-label="First Name"
          aria-describedby="basic-addon1"
          value={formData.firstname}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">
          <BiUser />
        </InputGroup.Text>
        <FormControl
          name="lastname"
          placeholder="Last Name"
          aria-label="Last Name"
          aria-describedby="basic-addon2"
          value={formData.lastname}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          <BiEnvelope />
        </InputGroup.Text>
        <FormControl
          name="email"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon3"
          value={formData.email}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon4">
          <BiLock />
        </InputGroup.Text>
        <FormControl
          name="password"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon4"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </InputGroup>
      {ShowMessage && (
        <div className="container">Don't get email? <span style={{ textDecoration: 'underline' }} onClick={resendEmali}>resend email</span></div>
      )}
      <div className='container'>{errors && <p style={{ color: 'red' }}>* {errors}</p>}</div>
      <div className='container'>{errors2 && <p style={{ color: 'red' }}>* {errors2}</p>}</div>
      <div className='container'>{errors3 && <p style={{ color: 'red' }}>* {errors3}</p>}</div>
      <Button variant="light" type="submit" id='custom-button-register'>
        Submit
      </Button>
    </form>
  )
}

export default RegisterForm