import React, { useState } from 'react';
import "./email_notification.css";
import axiosInstance from '../axiosconfig';

const Email_notification: React.FC = () => {
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                alert('Failed to send emails.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send emails.');
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
        </div>
    );
}
export default Email_notification;

