import React, { useState, useEffect } from 'react';
import "./email_notification.css";
import axiosInstance from '../axiosconfig';

interface Notification {
    notification_id: number;
    date_time: string;
    notification_subject: string;
    notification_message: string;
}

const formatDate = (dateString: string): string => {
    const datePortion = dateString.split('T')[0];
    return datePortion;
};

const Email_notification: React.FC = () => {
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // Fetch data from the database here
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/get-notifications');
                if (response.status === 200) {
                    setNotifications(response.data);// Assuming the API response is an array of notifications
                } else {
                    console.error('Failed to fetch notifications:', response.data);
                    // Handle failure to fetch notifications as needed
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
                // Handle error fetching notifications as needed
            }
        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, []); // Empty dependency array ensures the effect runs once when the component mounts


    const sendEmail = async () => {
        if (!emailSubject || !emailBody) {
            setError('Email subject and body are required.');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/send-email', {
                subject: emailSubject,
                body: emailBody,
            });

            if (response.status === 200) {
                setEmailSubject('');
                setEmailBody('');
                setError('');
                setSuccessMessage('Emails sent successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
                updateNotification();
            } else {
                alert('Failed to send emails.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send emails.');
        }
    };
    const updateNotification = async () => {
        try {
            const response = await axiosInstance.post('/api/update-notification', {
                subject: emailSubject,
                body: emailBody,
            });

            if (response.status === 200) {
                console.log('Notification updated successfully');
            } else {
                console.error('Failed to update notification:', response.data);
                // Handle failure to update notification as needed
            }
        } catch (error) {
            console.error('Error updating notification:', error);
            // Handle error updating notification as needed
        }
    };

    return (
        <div>
            <div className='email_container'>
                <div className='heading'>Send Email Notifications</div>
                <div className='subject_heading'>
                    <div className='email_subject'>Email Subject</div>
                </div>
                <div className='subject'>
                    <form>
                        <input type="text" name="subject_message"
                            placeholder='Short Description of the Message'
                            style={{ width: '80%', height: '40px' }}
                            value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} >
                        </input>
                    </form>
                </div>
                <div className='message'>
                    <div className='email_body'>Email Body</div>
                </div>
                <div className='body_message'>
                    <textarea rows={600}
                        placeholder='Notification Message'
                        style={{ width: '95%', height: '150px' }}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}>
                    </textarea>
                </div>
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
                <button className='send_notification' onClick={sendEmail}>Send</button>
            </div>

            <div className="previous_notification">
                <div className="Notification_Details">Notification sent to the users:</div>
                <div className="Notification_table-wrapper">
                    <table className="Notification_tabl-space">
                        <thead>
                            <tr className="notification_bg-info sticky-header">
                                <th>Notification Subject</th>
                                <th>Notification Body</th>
                                <th>Date Sent [YYYY-MM-DD]</th>
                            </tr>
                        </thead>
                        <tbody id="myTable">
                            {notifications.map((notification, index) => (
                                <tr key={notification.notification_id || index}>
                                    <td>{notification.notification_subject}</td>
                                    <td>{notification.notification_message}</td>
                                    <td>{formatDate(notification.date_time)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Email_notification;

