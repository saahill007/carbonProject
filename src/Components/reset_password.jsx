import React, { useState } from 'react';
// import axios from 'axios';
import './reset_password.css';
import axiosInstance from '../axiosconfig';

function ResetPassword() {

    const handleResetPasswordforadmin = async (e) => {
        e.preventDefault();

        try {
            // Send a request to the backend to initiate password reset
            const response = await axiosInstance.post('/api/resetpassword', { password, reset_token });

            if (response.status === 200) {
                setResetMessage('Password reset successful');
            } else {
                setResetError('An error occurred while resetting your password. Please try again later.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setResetError('An error occurred while resetting your password. Please try again later.');
        }
    };
    return (
        <div className="reset_password_container">
            <div className="reset_password">
                <h2>Reset Password</h2>
                <form onSubmit={handleResetPasswordforadmin}>
                    <div className="enterpassword">
                        <label htmlFor="Password">Password</label>
                        <input
                            type="password"
                            id="email"
                            name="email"
                            placeholder="Enter your password"
                            value="password"
                            required
                        />
                    </div>
                    <div className="reenterpassword">
                        <label htmlFor="Reenterpassword">Re-enter your password</label>
                        <input
                            type="password"
                            id="email"
                            name="email"
                            placeholder="Re-Enter your password"
                            value="password"
                            required
                        />
                    </div>
                    <div className="buttonclass">
                        <button type="submit">Reset Password</button>
                    </div>
                </form>
                <p className="reset-message">{"Reset Successful"}</p>
                <p className="reset-error">{"Reset Failed"}</p>
            </div>
        </div>
    );
}
export default ResetPassword;

