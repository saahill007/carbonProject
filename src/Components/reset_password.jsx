import React, { useState } from 'react';
// import axios from 'axios';
import './reset_password.css';
import axiosInstance from './axiosconfig';

function ResetPassword() {
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
                            value={Password}
                            onChange={handleEmailChange}
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
export default ResetPassword;

