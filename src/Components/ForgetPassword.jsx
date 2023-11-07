import React, { useState } from 'react';
// import axios from 'axios';
import './forgetpassword.css';
import axiosInstance from './axiosconfig';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [resetError, setResetError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            // Send a request to the backend to initiate password reset
            const response = await axiosInstance.post('/api/forgotpassword', { email });

            if (response.status === 200) {
                setResetMessage('Password reset email sent. Check your inbox.');
            } else {
                setResetError('An error occurred while resetting your password. Please try again later.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setResetError('An error occurred while resetting your password. Please try again later.');
        }
    };

    return (
        <div className="forgot_password_container">
            <div className="forgot_password">
                <h2>Forgot Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="enteremail">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="buttonclass">
                        <button type="submit">Reset Password</button>
                    </div>
                </form>
                <p className="reset-message">{resetMessage}</p>
                <p className="reset-error">{resetError}</p>
            </div>
        </div>
    );
}
export default ForgotPassword;

