import React from 'react'
import RegisterForm from './Form/RegisterForm'
import Paper from "@mui/material/Paper";

const Register = () => {
    return (
        <div className='change-main'>
            <Paper
                style={{
                    position: "relative",
                    width: "30vw",
                    margin: "0rem 1rem",
                    borderRadius: "1rem",
                    height: "70vh",
                    background: '#1B4B67'
                }}
            >
                <div className='chang-main-form'>
                    <div className='chang-main-form-h2-register'>
                        <h2>Register</h2>
                    </div>
                    <div className='chang-main-form-h2'>
                        <RegisterForm/>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Register