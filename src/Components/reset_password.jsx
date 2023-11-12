import React, { useState, useEffect } from 'react';
import './reset_password.css';
import axiosInstance from '../axiosconfig';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [resetError, setResetError] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            setResetError('Invalid reset link. Please try again.');
            setTimeout(() => {
                setResetError('');
            }, 3000); // Clear the error message after 3 seconds
        }
    }, []);

    const validatePassword = (password) => {
        // Password should be at least 8 characters long
        if (password.length < 8) {
            setResetError('Password must be at least 8 characters long.');
            return false;
        }

        // Password should contain at least one number
        if (!/\d/.test(password)) {
            setResetError('Password must contain at least one number.');
            return false;
        }

        // Password should contain at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setResetError('Password must contain at least one special character.');
            return false;
        }

        // Password should contain at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            setResetError('Password must contain at least one uppercase letter.');
            return false;
        }

        return true;
    };

    const handleResetPasswordforadmin = async (e) => {
        e.preventDefault();

        // Extract the token from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const resetToken = urlParams.get('token');

        if (!validatePassword(password)) {
            setTimeout(() => {
                setResetError('');
            }, 3000); // Clear the error message after 3 seconds
            return;
        }

        if (password !== confirmPassword) {
            setResetError('Passwords do not match. Please re-enter.');
            setTimeout(() => {
                setResetError('');
            }, 3000); // Clear the error message after 3 seconds
            return;
        }



        try {
            // Send a request to the backend to reset the password using the token
            const response = await axiosInstance.post('/api/resetpassword', {
                password,
                reset_token: resetToken,
            });

            console.log('Response:', response);

            if (response.status === 200) {
                setResetMessage('Password reset successful');
                setResetError('');
                setTimeout(() => {
                    setResetMessage('');
                }, 3000);
            } else {
                setResetError('An error occurred while resetting your password. Please try again later.');
                setResetMessage('');
                setTimeout(() => {
                    setResetError('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setResetError('An error occurred while resetting your password. Please try again later.');
            setResetMessage('');
            setTimeout(() => {
                setResetError('');
            }, 3000);
        }
    };

    return (
        <div className="reset_password_container">
            <div className="reset_password">
                <h2>Reset Password</h2>

                <form onSubmit={handleResetPasswordforadmin}>
                    <div className="enterpassword">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="reenterpassword">
                        <label htmlFor="confirmPassword">Re-enter your password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="buttonclass">
                        <button type="submit">Reset Password</button>
                    </div>
                </form>

                {resetError && <p className="reset-error">{resetError}</p>}
                {resetMessage && <p className="reset-message">{resetMessage}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
