import React, { useState } from "react";
import "./contact.css";
import axiosInstance from './axiosconfig';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;

    // Regular expression to allow one or more digits
    const phonePattern = /^\d+$/;

    if (phonePattern.test(newPhone)) {
      setPhone(newPhone);
      setUpdateError('');
    } else {
      setUpdateError('Phone number must contain only digits');
    }
  };

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setUpdateError('Phone number must contain exactly 10 digits');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/contact/insert', {
        email,
        phone,
      });

      if (response.status === 200) {
        // Data updated successfully
        setUpdateSuccess(true);

        // Clear success message after 10 seconds
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 10000); // 10 seconds in milliseconds
        setEmail('');
        setPhone('');
      } else {
        setUpdateError('Failed to update contact details');
      }
    } catch (error) {
      console.error('Error updating contact details:', error);
      setUpdateError('Failed to update contact details');
    }
  };

  return (
    <div className="contact_container">
      <div className="contact_start">
        <h2>Change Contact Details</h2>
        <form onSubmit={handleSubmitContact}>
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
        {updateError && <p className="update-error">{updateError}</p>}
        {updateSuccess && (<p className="update-success">Contact details updated successfully</p>)}
      </div>
    </div>
  );
};

export default Contact;
