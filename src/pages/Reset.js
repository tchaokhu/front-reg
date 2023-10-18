import React from 'react'
import ResetForm from './Form/ResetForm'
import Paper from "@mui/material/Paper";

const Reset = () => {
    return (
        <div className='change-main'>
            <Paper
                style={{
                    boxShadow: " 0px 5px 4px rgb(176, 176, 176)",
                    position: "relative",
                    width: "55vw",
                    margin: "0rem 1rem",
                    borderRadius: "1rem",
                    height: "70vh",
                }}
            >
                <div className='chang-main-form'>
                    <div className='chang-main-form-h2'>
                        <h2>Reset your Password</h2>
                    </div>
                    <div className='chang-main-form-h2'>
                        <p>Please provide email address that you used when you signed up for your account.</p>
                    </div>
                    <div className='chang-main-form-h2'>
                        <ResetForm/>
                    </div>
                    <div className='chang-main-form-h2'>
                        <p>We will send you an email that will allow your to reset your password</p>
                    </div>
                
        
                
                </div>
                
            </Paper>

        </div>
    )
}

export default Reset