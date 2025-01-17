import React, { useState } from 'react';
// import './SignUp.css'; // Importing CSS for styling
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [isOnLoginPage, setIsOnLoginPage] = useState(true);
    const [isOnSignUpPage, setIsOnSignUpPage] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };
    // useEffect(()=>{
    //     localStorage.setItem('isOnLoginPage', isOnLoginPage);
    //     localStorage.setItem('isOnSignUpPage', isOnSignUpPage);
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/signin`, {
                // await axios.post('http://localhost:5001/api/signin', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                console.log("Form submitted successfully.");
                setIsOnLoginPage(true);
                sessionStorage.setItem('isOnLoginPage', isOnLoginPage);
                setIsOnSignUpPage(false);
                sessionStorage.setItem('isOnSignUpPage', isOnSignUpPage);
                navigate('/login');
            } catch (error) {
                console.error("Error submitting form:", error.message);
            }
        } else {
            setErrors(formErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="sign-up-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} className="sign-up-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignUp;




