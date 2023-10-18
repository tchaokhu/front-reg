import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ChangePasswordForm = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        password: '',
        confirmpassword: ''
    });
    const [errors, setErrors] = useState({});
    const [errors2, setErrors2] = useState(null);
    const { username } = useParams();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setErrors2(null);
        console.log(printStrongNess(input.password));

        try {
            const response = await axios.post('http://localhost:8080/api/v1/login/reset-password', {
                username: username,
                password: input.password
            });
            console.log(response.data);
            if (response.status === 200) {
                navigate('/login')
            }
        } catch (err) {
            setErrors2('Password must not be same.');
        }

    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setInput({
            ...input,
            password: newPassword
        });
    };

    const handleChange = (name, value) => {
        setInput({
            ...input,
            [name]: value
        });
    };

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (!input.password || input.password.length < 8) {
            isValid = false;
            newErrors["password"] = "Password must be at least 8 characters.";
        }

        if (!input.confirmpassword) {
            isValid = false;
            newErrors["confirmpassword"] = "Please Enter your Confirm Password.";
        }

        if (input.password !== input.confirmpassword) {
            isValid = false;
            newErrors["confirmpassword"] = "Confirm password is Not Matched";
        }

        if (printStrongNess(input.password) === "Weak") {
            isValid = false;
            newErrors["strength"] = "Password must have A-Z, a-z,special characters and 0-9.";
        }
        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="">
            {/* new password */}
            <div className="form-container">
                {/* new password */}
                <div className="form-group">
                    <Form.Label htmlFor="inputPassword5">New Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        className="form-control-example"
                        onChange={handlePasswordChange}
                        value={input.password}
                    />

                </div>

                {/* confirm password */}
                <div className="form-group">
                    <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="confirmPassword"
                        aria-describedby="passwordHelpBlock"
                        className="form-control-example"
                        onChange={(e) => handleChange('confirmpassword', e.target.value)}
                        value={input.confirmpassword}
                    />
                    {errors.confirmpassword && (
                        <Form.Text id="passwordHelpBlock" className="custom-text">
                            * {errors.confirmpassword}    <br />
                        </Form.Text>

                    )}
                    {errors.password && (
                        <Form.Text id="passwordHelpBlock" className="custom-text">
                            * {errors.password}  <br />
                        </Form.Text>

                    )}
                    {errors2 && (
                        <Form.Text id="passwordHelpBlock" className="custom-text">
                            * {errors2} <br />
                        </Form.Text>

                    )}
                    {errors.strength && (
                        <Form.Text id="passwordHelpBlock" className="custom-text">
                            * {errors.strength}
                        </Form.Text>

                    )}
                </div>

                <div className="text-center">
                    <Button id="custom-button" variant="warning" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordForm;








