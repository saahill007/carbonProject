import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Slider.css";
import axiosInstance from '../axiosconfig';


export function Dropdown() {
  const [question, setQuestion] = useState(""); // State to store the user's question

  const [fields, setFields] = useState([
    { dropdown: "", carbonOffset: "" },
    { dropdown: "", carbonOffset: "" },
    { dropdown: "", carbonOffset: "" },
    { dropdown: "", carbonOffset: "" },
  ]);

  const [message, setMessage] = useState(null); 

  const handleSave = async () => {
    // Prepare the data to be sent to the server
    const optionsData = fields.map((field, index) => {
     let optiontype = '';
     if (/^[a-zA-Z]+$/.test(field.dropdown)) {
        optiontype = 'Alphabetic';
      } else if (/^\d+$/.test(field.dropdown)) {
        optiontype = 'Numeric';
      } else if (/^[a-zA-Z\d]+$/.test(field.dropdown)) {
        optiontype = 'Alphanumeric';
      }
  
  return {
        dropdown: field.dropdown,
        optiontype,
        carbonOffset: field.carbonOffset,
      };
    });
    const data = {
      question,
      options: optionsData,
    //   questionFlag: 1,
    //   typeOfQuestion: 'Dropdown', 
    };

    try {
      const response = await axiosInstance.post('/api/dropdown', data);
  
      if (response.status === 201) {
        setMessage('Question and Options added successfully.');
      setTimeout(() => {
        setMessage(null); 
      }, 2000);
          } else {
            setMessage('Error adding the question.');
      setTimeout(() => {
        setMessage(null); 
      }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error updating the question.');
      setTimeout(() => {
        setMessage(null); // Clear the message after 2 seconds
      }, 2000);
    }
  };

  const addField = () => {
    setFields([...fields, { dropdown: "", carbonOffset: "" }]);
  };

  const removeLastField = () => {
    if (fields.length > 1) {
      const updatedFields = [...fields];
      updatedFields.pop();
      setFields(updatedFields);
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    const questionValue = getParameterByName('question');
    const source = getParameterByName('source');
    if (source === 'add') {
      navigate(`/questions/add?question=${questionValue}`);
    } else if (source === 'edit') {
      navigate(`/questions/edit?question=${questionValue}`);
    }
  };
  

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  useEffect(() => {
    // Call the getParameterByName function to extract the 'question' parameter from the URL
    const questionValue = getParameterByName('question');
    
    if (questionValue) {
      // Set the 'question' state to the value retrieved from the URL
      setQuestion(questionValue);
    }
  }, []);

  const handleChange = (index, event, field) => {
    const updatedFields = [...fields];
    if (field === 'carbonOffset' && /[a-zA-Z]/.test(event.target.value)) {
      setMessage("Error CarbonOffset value should be numeric.");
            setTimeout(() => {
              setMessage(null);
            }, 2000);
            return;
    }
    updatedFields[index][field] = event.target.value;
    setFields(updatedFields);
  };

  return (
    <div>
      <div className="centered-container">
        <div className="question-input-container">
          <input
            type="text"
            placeholder="Type your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
    </div>
    <div>
      <div className="input-fields-container">
        {fields.map((field, index) => (
        <div key={index} className="side-by-side-inputs">
          <input
            type="text"
            name={`dropdown`} 
            value={field.dropdown}
            onChange={(e) => handleChange(index, e, "dropdown")}
            placeholder={`Dropdown option ${index + 1}`}
          />
          <input
            type="text"
            name={`carbonOffset`}
            value={field.carbonOffset}
            onChange={(e) => handleChange(index, e, "carbonOffset")}
            placeholder={`carbonOffset value for option ${index + 1}`}
          />
        </div>
       ))}
       </div>
       </div>
      
      <div className="buttonss">
        <button onClick={handleBack} className="back-button">Back</button>
        <div className="ab">
          <button onClick={addField} className="add-button">Add</button>
            {fields.length > 1 && (
              <button onClick={removeLastField} className="remove-button">Remove</button>
            )}
          </div>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
      {/* Message Display */}
{message && (
        <div style={{ position: 'absolute', bottom: 20, left: '48%', transform: 'translateX(-50%)' }}>
          <div
            style={{
              background: message.includes('Error') ? 'red' : '#A3C7A0',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {message}
          </div>
        </div>
      )}
    </div>
    

  );
}

export default Dropdown;