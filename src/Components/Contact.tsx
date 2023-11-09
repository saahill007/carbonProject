import React, { useState, useEffect } from "react";
import "./contact.css";
import axiosInstance from './axiosconfig';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // useEffect to fetch data from the database and set the initial values
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/contact'); // Assuming this is your endpoint to fetch contact details

        if (response.status === 200) {
          const { email, phone, address } = response.data[0];

          console.log('Fetched data:', response.data); // Check the structure of the response
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Address:', address);

          // Set initial values from the database
          setEmail(email || ''); // Using an empty string as fallback if email is null
          setPhone(phone || '');
          setAddress(address || '');
        } else {
          setUpdateError('Failed to fetch contact details');
        }
      } catch (error) {
        console.error('Error fetching contact details:', error);
        setUpdateError('Failed to fetch contact details');
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
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
        address   //----------------------------------------------------------------
      });

      if (response.status === 200) {
        // Data updated successfully
        setUpdateSuccess(true);
         // Fetch the updated data from the database
      const fetchResponse = await axiosInstance.get('/api/contact');
      if (fetchResponse.status === 200) {
        const { email, phone, address } = fetchResponse.data[0];

        // Update the state with the new values
        setEmail(email || '');
        setPhone(phone || '');
        setAddress(address || '');

         // Clear success message after 10 seconds
         setUpdateSuccess(true);
         setTimeout(() => {
           setUpdateSuccess(false);
         }, 10000); // 10 seconds in milliseconds
       } else {
         setUpdateError('Failed to fetch updated contact details');
       }
     } else {
       setUpdateError('Failed to update contact details');
     }
   } catch (error) {
     console.error('Error updating contact details:', error);
     setUpdateError('Failed to update contact details');
   }
 };
 
 
 
 
 
 

  return (
      <div className="contact_start">
        <h2>Change Your Contact Details</h2>
        <form onSubmit={handleSubmitContact}>
          <div className="enteremailidofcontact">
            <label htmlFor="email">Current Email</label>
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
            <label htmlFor="phone">Current Phone</label>
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

          <div className="enterAddress">
          <label htmlFor="address">Current Address</label>
          <textarea
            id="address"
            name="Address"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            required
            rows={5} // Adjust the number of rows based on your preference
          />
        </div>

          <button className='submit_login_contact'>Save</button>

        </form>
        {updateError && <p className="update-error">{updateError}</p>}
        {updateSuccess && (<p className="update-success">Contact details updated successfully</p>)}
      </div>
   
  );
};

export default Contact;
