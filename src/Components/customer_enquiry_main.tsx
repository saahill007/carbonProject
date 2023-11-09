import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosconfig';
import { useNavigate } from 'react-router-dom';
import './customer_enquiry_main.css';

interface enquiry {
    enquiry_id: number;
    firstname: string;
    lastname: string;
    enquiry_date: string;
    email: string;
    enquiry_question: string;
    enquiry_response: string;
}

const Customer_enquiry_main: React.FC = () => {
    const [waitingForResponseData, setWaitingForResponseData] = useState<enquiry[]>([]);
    const [answeredEnquiriesData, setAnsweredEnquiriesData] = useState<enquiry[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWaitingForResponseData();
        fetchAnsweredEnquiriesData();
    }, []);

    const fetchWaitingForResponseData = () => {
        axiosInstance.get('/api/enquiry_main_fetch_waiting_for_response')
            .then((response) => {
                setWaitingForResponseData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data for waiting for response:', error);
            });
    };

    const fetchAnsweredEnquiriesData = () => {
        axiosInstance.get('/api/enquiry_main_fetch_answered_enquiries')
            .then((response) => {
                setAnsweredEnquiriesData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data for answered enquiries:', error);
            });
    };

    const handleRespondClick = (enquiryId: number) => {
        console.log(`Navigating to /customer_enquiries/${enquiryId}`);
        navigate(`/customer_enquiries/${enquiryId}`);
    };

    return (
        <div className="enquiry_container">
            <div className="enquiry_container_header">
                <h2 className="enquiry_header_text">LIST OF ENQUIRIES WAITING FOR RESPONSE:</h2>
            </div>
            <div className="enquiry_table_wrapper">
                <table className="enquiry_table_space">
                    <thead>
                        <tr className="enquiry_sticky_header">
                            <th>Name</th>
                            <th>Enquiry Date</th>
                            <th>Email ID</th>
                            <th>Enquiry_Question</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {waitingForResponseData.map((item) => (
                            <tr key={item.enquiry_id}>
                                <td>{item.firstname} {item.lastname}</td>
                                <td>{item.enquiry_date}</td>
                                <td>{item.email}</td>
                                <td>{item.enquiry_question}</td>
                                <td>
                                    <button
                                        className='enquiry_button_respond'
                                        onClick={() => handleRespondClick(item.enquiry_id)}
                                    >
                                        Respond
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="enquiry_container_header">
                <h2 className="enquiry_header_text"> ANSWERED ENQUIRES:</h2>
            </div>
            <div className="enquiry_table_wrapper">
                <table className="enquiry_table_space">
                    <thead>
                        <tr className="enquiry_sticky_header">
                            <th>Name</th>
                            <th>Enquiry Date</th>
                            <th>Email ID</th>
                            <th>Enquiry Question</th>
                            <th>Enquiry Response</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {answeredEnquiriesData.map((item) => (
                            <tr key={item.enquiry_id}>
                                <td>{item.firstname} {item.lastname}</td>
                                <td>{item.enquiry_date}</td>
                                <td>{item.email}</td>
                                <td>{item.enquiry_question}</td>
                                <td>{item.enquiry_response}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Customer_enquiry_main;

