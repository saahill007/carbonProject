import React, { useEffect, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '../axiosconfig';
import { useParams, useNavigate } from 'react-router-dom'; // Import the useParams hook
import "./customer_queries.css";

const CustomerQueries: React.FC = () => {
    const { enquiry_id } = useParams(); // Get the enquiry_id from the URL
    const navigate = useNavigate();

    const [customerDetails, setCustomerDetails] = useState({
        enquiry_id: '',
        firstname: '',
        lastname: '',
        email: '',
        enquiry_question: '',
    });

    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch customer details using the enquiry_id
    useEffect(() => {
        if (enquiry_id) {
            axiosInstance.get(`/api/getenquiryCustomerDetails?enquiry_id=${enquiry_id}`)
                .then((response: AxiosResponse) => {
                    setCustomerDetails(response.data);
                })
                .catch((error: AxiosError) => {
                    console.error("Error fetching customer details: " + error);
                });
        }
    }, [enquiry_id]);

    const sendResponse = () => {
        if (!response) {
            setError('Please type in your response .');
            setTimeout(() => setError(''), 3000);
            return;
        }
        // Add this line to log the recipient's email address
        console.log('Recipient Email:', customerDetails.email);
        // Make a POST request to your server to send the response via email
        axiosInstance.post('/api/sendCustomerEnquiryEmail', {
            ID: customerDetails.enquiry_id,
            to: customerDetails.email,
            subject: `Response to Customer Enquiry: ${customerDetails.enquiry_question}`,
            text: response,
        })
            .then((response: AxiosResponse) => {
                setSuccessMessage('Email sent successfully.');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/customer_enquiry_main'); // Navigate back to customer_enquiry_main
                }, 500);
                setError(''); // Clear any previous error message
                console.error("Email sent successfully: " + response);

            })
            .catch((error: AxiosError) => {
                setSuccessMessage('');
                setError('Error sending email. Please try again.');
                setTimeout(() => setError(''), 3000);
                console.error("Error sending email: " + error);
            });
    };

    return (
        <div>
            <div className='customer_query_container'>
                <h2>Customer Enquiries</h2>
                <div className='background_container1'>
                    <div className='background_container2'>
                        <div>
                            <h3 className='customer_details'>Customer: {customerDetails.firstname} {customerDetails.lastname}</h3>
                            <p className='enquiry_question'>{customerDetails.enquiry_question}</p>
                            <div className='Response_box'>
                                <textarea
                                    rows={60}
                                    placeholder='Response'
                                    style={{ width: '95%', height: '130px' }}
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                />
                            </div>
                            <button className='send_response' onClick={sendResponse}>Send</button>
                            {successMessage && <div className='success_message_enquiry'>{successMessage}</div>}
                            {error && <div className='error_message_enquiry'>{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
    );
}
export default CustomerQueries;

