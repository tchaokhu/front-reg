import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ChangePasswordForm from './Form/ChangePasswordForm';
import Paper from "@mui/material/Paper";


const ConfirmPassword = () => {
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const {username} = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login/reset-password', {
        username: username,
        password: password
      });
      if (response.status === 200) {
        navigate('/login')
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check if passwords match in real-time
    setPasswordsMatch(newPassword === password1);
    if (password1 === newPassword) {
      setErrors(null)
    }
    else {
      setErrors('Passwords do not match')
    }
  };

  const handlePassword1Change = (e) => {
    const newPassword1 = e.target.value;
    setPassword1(newPassword1);

    // Check if passwords match in real-time
    setPasswordsMatch(newPassword1 === password);
    if (password === newPassword1) {
      setErrors(null)
    }
    else {
      setErrors('Passwords do not match')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Email: {username}</h1>
        <label htmlFor="password">new password</label>

        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange} // Update the state with the input value
          required
        />
        <label htmlFor="password">confirm password</label>
        <input
          type="password"
          name="password"
          value={password1}
          onChange={handlePassword1Change} // Update the state with the input value
          required
        />
      </div>
      {errors && (
        <p style={{color:'red'}}>{errors}</p>
      )}
      <button type="submit">Reset Password</button>
    </form>
    // <div className='change-main'>
    //         <div className='change-main-paper'>
    //             <Paper
    //                 style={{
    //                     boxShadow: " 0px 5px 4px rgb(176, 176, 176)",
    //                     position: "relative",
    //                     width: "55vw",
    //                     margin: "0rem 1rem",
    //                     borderRadius: "1rem",
    //                     height: "70vh",
    //                 }}
    //             >
    //                 <div className='chang-main-form'>
    //                     <div className='chang-main-form-h2'>
    //                         <h2>Change your password</h2>
    //                     </div>
    //                     <div className='chang-main-form-h2'>
    //                         <p>Enter a new password below to change your password.</p>
    //                     </div>
    //                     <br/>
    //                     <div className='chang-main-form-h2'>
    //                         <ChangePasswordForm />
    //                     </div>
    //                 </div>
    //             </Paper>
    //         </div>


    //     </div>
  );
}

export default ConfirmPassword