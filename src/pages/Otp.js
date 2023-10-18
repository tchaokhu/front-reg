import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Container, Row } from "react-bootstrap";
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { Input } from "@mui/material";

function CountdownTimer({ initailtime, key }) {
    const [time, setTime] = useState(initailtime);
    if (key === true)
        setTime(180)
    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [time]); // Include restartKey in the dependency array

    return <div>{time} seconds</div>;
}



const Otp = () => {
    const [otp, setOtp] = useState(null);
    const [errors, setErrors] = useState(null);
    const [timerRestartKey, setTimerRestartKey] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.data;



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/login/check-otp', {
                otp: otp,
            });

            if (response.status === 200) {
                if (response.data === 'Otp expired') {
                    setErrors('Otp expired. Please click resent.');
                } else {
                    const username = response.data;
                    navigate(`/confirm-password/${username}`)
                }
            }
        } catch (err) {
            setErrors('Otp is not correct');
        }
    };


    const handleInputChange = (event) => {
        const value = event.target.value;
        const sanitizedValue = value.replace(/[^0-9]/g, ''); // Allow only 0-9
        if (sanitizedValue.length <= 6)
        // console.log(sanitizedValue)
            setOtp(sanitizedValue);
      };
    const resentOtp = async (e) => {
        if(timerRestartKey === true)
            setTimerRestartKey(false);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/login/resent-otp', {
                username: email,
            });
            console.log(response.data);
            if(response.status === 200){
                setTimerRestartKey(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <Container className='container' >
                <Row>
                    <Col >
                        <div >
                            <div className="container2" style={{ paddingTop: 100 }}>
                                <Icon style={{ width: 80, height: 80 }} icon="iconamoon:shield-yes-bold" />
                            </div>


                            <div className='container2' style={{ paddingTop: 20 }} >
                                <p style={{ fontSize: 50, fontWeight: 'bold' }} >OTP verification</p>
                            </div>
                            <div className="container2">

                                <p style={{ fontSize: 20 }}>code has been sent to your email.</p></div>

                            <div className="container2">
                                <CountdownTimer initailtime={180} key={timerRestartKey} />
                            </div>
                            <div className="container2" style={{ paddingTop: 20 }}>
                                <div>
                                    <Input
                                        style={{ maxWidth: 60 }}
                                        value={otp}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                            </div>

                            <div style={{ paddingTop: 30, fontSize: 20 }} className='container2' >
                                <span >Don’t get code? <span className='underline' onClick={() => { resentOtp() }}>Resend</span></span>
                            </div>
                            <div className='container' style={{ paddingTop: 20 }}>
                                {errors && (<p style={{ color: 'red' }}>{errors}</p>)}

                            </div>
                            <div className='container' style={{ paddingBottom: 120 }}>
                                <Button variant="contained" type="submit">Continue</Button>
                                {/* <button onClick={handleRestartTimer} type='button'>Restart Timer</button> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </form>
    )
}

export default Otp