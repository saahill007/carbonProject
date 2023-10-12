import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Slider.css";

export function Slider() {
  const [question, setQuestion] = useState(""); // State to store the user's question

  const [fields, setFields] = useState([
    { baseline: "", carbonOffset: "" },
    { baseline: "", carbonOffset: "" },
    { baseline: "", carbonOffset: "" },
    { baseline: "", carbonOffset: "" },
  ]);

  const handleSave = async () => {
    // Prepare the data to be sent to the server
    const optionsData = fields.map((field, index) => ({
      baseline: field.baseline,
      carbonOffset: field.carbonOffset,
    }));
    const data = {
      question,
      // questionFlag: 1, 
      // typeOfQuestion: 'Dropdown', 
      options: optionsData,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/slider', data);
  
      if (response.status === 201) {
        alert('Question and Options added successfully.');
      } else {
        alert('Error updating the question.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating the question.');
    }
  };

  const addField = () => {
    setFields([...fields, { baseline: "", carbonOffset: "" }]);
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
    navigate("/questions/add");
  };

    // Define the getParameterByName function
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

  const handleChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index][event.target.name] = event.target.value;
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
            name={`baseline`}
            value={field.baseline}
            onChange={(e) => handleChange(index, e,"baseline")}
            placeholder={`Baseline ${index + 1} of slider`}
          />
          <input
            type="text"
            name={`carbonOffset`}
            value={field.carbonOffset}
            onChange={(e) => handleChange(index, e,"carbonOffset")}
            placeholder={`carbonOffset value for baseline ${index + 1}`}
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
    </div>
    

  );
}

export default Slider;