import React, { useEffect, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from './axiosconfig';
import "./customer_queries.css";

const CustomerQueries: React.FC = () => {
    const [customerDetails, setCustomerDetails] = useState({
        enquiry_id: '',
        enquiry_name: '',
        enquiry_question: '',
        email_id: '',
    });

    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [totalFlagOneInquiries, setTotalFlagOneInquiries] = useState(0);
    const [enquirypresent, setenquirypresent] = useState(false);

    useEffect(() => {
        // Fetch the total number of inquiries with flag 1
        axiosInstance.get('/api/getTotalFlagOneInquiries')
            .then((response: AxiosResponse) => {
                setTotalFlagOneInquiries(response.data.total);
            })
            .catch((error: AxiosError) => {
                console.error("Error fetching total flag 1 inquiries: " + error);
            });
    }, []);

    const sendResponse = () => {
        if (!response) {
            setError('Please type in your response .');
            setTimeout(() => setError(''), 3000);
            return;
        }
        // Make a POST request to your server to send the response via email
        axiosInstance.post('/api/sendCustomerEnquiryEmail', {
            ID: customerDetails.enquiry_id,
            to: customerDetails.email_id,
            subject: `Response to Customer Enquiry: ${customerDetails.enquiry_question}`,
            text: response,
        })
            .then((response: AxiosResponse) => {
                setSuccessMessage('Email sent successfully.');
                setTimeout(() => setSuccessMessage(''), 5000);
                setError(''); // Clear any previous error message
                console.error("Email sent successfully: " + response);

                // Trigger a re-fetch of the next customer's inquiry details
                fetchNextCustomerInquiry();
            })
            .catch((error: AxiosError) => {
                setSuccessMessage('');
                setError('Error sending email. Please try again.');
                setTimeout(() => setError(''), 3000);
                console.error("Error sending email: " + error);
            });
    };

    const fetchNextCustomerInquiry = () => {
        axiosInstance.get('/api/goToNextInquiry', {
            params: { enquiryId: customerDetails.enquiry_id },
        })
            .then((response: AxiosResponse) => {
                if (response.data.message) {
                    setenquirypresent(true);
                } else {
                    setCustomerDetails({
                        enquiry_id: response.data.enquiry_id,
                        enquiry_name: response.data.firstname,
                        enquiry_question: response.data.enquiry_question,
                        email_id: response.data.email,
                    });
                    setResponse(''); // Clear the response textarea
                }
            })
            .catch((error: AxiosError) => {
                console.error("Error fetching data: " + error);
            });
    };

    const fetchPreviousCustomerInquiry = () => {
        axiosInstance.get('/api/goToPreviousInquiry', {
            params: { enquiryId: customerDetails.enquiry_id },
        })
            .then((response: AxiosResponse) => {
                if (response.data.message) {
                } else {
                    setCustomerDetails({
                        enquiry_id: response.data.enquiry_id,
                        enquiry_name: response.data.firstname,
                        enquiry_question: response.data.enquiry_question,
                        email_id: response.data.email,
                    });
                    setResponse('');
                }
            })
            .catch((error: AxiosError) => {
                console.error("Error fetching data: " + error);
            });
    };

    useEffect(() => {
        fetchNextCustomerInquiry();
    }, []);

    return (
        <div>
            <div className='customer_query_container'>
                <h2>Customer Enquiries</h2>
                <div className='background_container1'>
                    <div className='background_container2'>
                        {totalFlagOneInquiries === 0 || enquirypresent ? (
                            <div>
                                <h3 className='customer_details1'>No customer enquiry to answer</h3>
                            </div>
                        ) : (
                            <div>
                                <h3 className='customer_details'>Customer: {customerDetails.enquiry_name}</h3>
                                <p className='enquiry_question'>{customerDetails.enquiry_question}</p>
                                <div className='Response_box'>
                                    <textarea
                                        rows={6}
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
                        )}
                    </div>
                    <div className='back_next_buttons'>
                        <button className='back_button' onClick={fetchPreviousCustomerInquiry}>Back</button>
                        <button className='next_button' onClick={fetchNextCustomerInquiry}>Next</button>
                    </div>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
    );
}
export default CustomerQueries;

