import React, { useState } from 'react'
import api from '../../api/apiConfig'

const RegisterForm = () => {
    // const [firstname, setFirstname] = useState('');
    // const [lastname, setLastname] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await api.post('/api/v1/registration', formData);
          if (response.status === 200) {
            console.log("Successfully logged in");
          }else {
            console.error("Successfully not logged in");
          }
          console.log(response.data);
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error('Error:', error);
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
                <label htmlFor="firstname">firstname</label>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="lastname">lastname</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm