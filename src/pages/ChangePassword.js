import React from 'react'
import ChangePasswordForm from './Form/ChangePasswordForm'
import Paper from "@mui/material/Paper";

const ChangePassword = () => {
    
    return (
        <div className='change-main'>
            <div className='change-main-paper'>
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
                            <h2>Change your password</h2>
                        </div>
                        <div className='chang-main-form-h2'>
                            <p>Enter a new password below to change your password.</p>
                        </div>
                        <br/>
                        <div className='chang-main-form-h2'>
                            <ChangePasswordForm />
                        </div>
                    </div>
                </Paper>
            </div>


        </div>
    )
}

export default ChangePassword