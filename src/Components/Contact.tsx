import React, { useState } from "react";
import "./contact.css";
import axiosInstance from './axiosconfig';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmitcontact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/contact/update', {
        email,
        phone,
      });

      if (response.status === 200) {
        // Data updated successfully
        // You can display a success message here
        console.log('Contact details updated successfully');
      } else {
        setLoginError('Failed to update contact details');
      }
    } catch (error) {
      console.error('Error updating contact details:', error);
      setLoginError('Failed to update contact details');
    }
  };

  return (
    <div className="contact_container">
      <div className="contact_start">
        <h2>Change Contact Details</h2>
        <form onSubmit={handleSubmitcontact}>
          <div className="enteremailidofcontact">
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
          <div className="enterphonenumber">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <button className='submit_login_contact'>Save</button>

        </form>
        {loginError && <p className="admin_error_message">{loginError}</p>}
      </div>
    </div>
  );
};

export default Contact;
