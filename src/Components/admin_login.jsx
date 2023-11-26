import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin_login.css';
// import axios from 'axios'; // Import Axios library
import axiosInstance from '../axiosconfig';


function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlelandingpage = () => {
        navigate('/');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleForgotPasswordClick = () => {
        navigate('/forgotpassword'); // Use navigate to go to the desired route
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Email:', email);
            console.log('Password:', password);

            const response = await axiosInstance.post('/api/admin/login', {
                email,
                password,
            });

            if (response.status === 200) {
                // Redirect to admin dashboard upon successful login
                window.location.href = '/values/admin';
            } else {
                setLoginError('Invalid credentials. Please try again.');
                setTimeout(() => {
                    setLoginError('');
                }, 2000);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginError('Invalid credentials. Please try again.');
            setTimeout(() => {
                setLoginError('');
            }, 2000);
        }
    };
    return (
        <div className="admin_login_container" style={{paddingTop:"100px"}}>
            <div className="adminlogin_start">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="enteremailid">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="enterpass">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit_login" className='submit_login'>Login</button>
                        <button type="button" onClick={handleForgotPasswordClick}> Forgot Password </button>
                    </div>
                </form>
                {loginError && <p className="admin_error_message">{loginError}</p>}
            </div>
        </div>
    );
}
export default AdminLogin;
