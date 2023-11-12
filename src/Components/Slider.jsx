import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Slider.css";
import axiosInstance from '../axiosconfig';


export function Slider() {
  const [question, setQuestion] = useState(""); // State to store the user's question
  const [baselineType, setBaselineType] = useState(""); // State to store the selected baseline type
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState([]);

  // const [fields, setFields] = useState([
  //   { baseline: "", carbonOffset: "" },
  //   { baseline: "", carbonOffset: "" },
  //   { baseline: "", carbonOffset: "" },
  //   { baseline: "", carbonOffset: "" },
  // ]);
  // const [message, setMessage] = useState(null); 

  const handleSave = async () => {
    // Prepare the data to be sent to the server
    const optionsData = fields.map((field, index) => {
      let optiontype = "";
      if (baselineType === "alpha") {
        optiontype = "Alphabetic";
      } else if (baselineType === "numeric") {
        optiontype = "Numeric";
      }
  
  
      return {
        baseline: field.baseline,
        optiontype,
        carbonOffset: field.carbonOffset,
      };
    });
    const data = {
      question,
      options: optionsData,
    };
  
    try {
      const response = await axiosInstance.post("/api/slider", data);
  
      if (response.status === 201) {
        setMessage("Question and Options added successfully.");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else {
        setMessage("Error adding the question.");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error updating the question.");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };
  

  const addField = () => {
    if (baselineType === "alpha") {
      return;
    }
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
    const questionValue = getParameterByName('question');
    const source = getParameterByName('source');
    if (source === 'add') {
      navigate(`/questions/add?question=${questionValue}`);
    } else if (source === 'edit') {
      navigate(`/questions/edit?question=${questionValue}`);
    }
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

      const handleChange = (index, event, inputType) => {
        const updatedFields = [...fields];
        const { name, value } = event.target;
      
        if (inputType === "input") {
          if (baselineType === "numeric" && isNaN(value)) {
            setMessage("Error Baseline value should be numeric.");
            setTimeout(() => {
              setMessage(null);
            }, 2000);
            return;
          }
          updatedFields[index]["baseline"] = value;
        } else if (inputType === "carbonOffset") {
          if (isNaN(value)) {
            setMessage("Error CarbonOffset value should be numeric.");
            setTimeout(() => {
              setMessage(null);
            }, 2000);
            return;
          }
      
          updatedFields[index]["carbonOffset"] = value;
        }
      
        setFields(updatedFields);
      };

      const handleBaselineTypeChange = (event) => {
        const selectedBaselineType = event.target.value;
        if (selectedBaselineType === "Null") {
          setFields([]);
          setButtonsVisible(false);
        } else {
          setBaselineType(selectedBaselineType);
          setFields(
            Array.from({ length: 4 }, () => ({ baseline: "", carbonOffset: "" }))
          );
          setButtonsVisible(true);
        }
      };

      const handleBaselineChange = (index, event) => {
        const updatedFields = [...fields];
        const { value } = event.target;
    
        // Ensure the value is one of the valid options
        if (value !== "Below Average" && value !== "Average" && value !== "Good" && value !== "Best") {
          setMessage("Invalid baseline value.");
          setTimeout(() => {
            setMessage(null);
          }, 2000);
          return;
        }
    
        if (disabledOptions.includes(value)) {
          setMessage("This option is already selected.");
          setTimeout(() => {
            setMessage(null);
          }, 2000);
          return;
        }
    
        updatedFields[index]["baseline"] = value;
        setFields(updatedFields);
    
        // Disable the selected option
        setDisabledOptions([...disabledOptions, value]);
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
        <div className="baseline-type-container">
          <label htmlFor="baselineType">Select your baseline type: </label>
          <select id="baselineType" onChange={handleBaselineTypeChange}>
            <option value="Null">--Please choose an option--</option>
            <option value="alpha">Alphabetic(Good,Bad)</option>
            <option value="numeric">Numeric(1x,2x)</option>
          </select>
          </div>
    </div>
    <div>
        <div className="input-fields-container">
          {fields.map((field, index) => (
            <div key={index} className="side-by-side-inputs">
              {baselineType === "alpha" ? (
                <select
                  name="baseline"
                  value={field.baseline}
                  onChange={(e) => handleBaselineChange(index, e)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="Below Average" disabled={disabledOptions.includes("Below Average")}>
                   Below Average
                  </option>
                  <option value="Average" disabled={disabledOptions.includes("Average")}>
                    Average
                  </option>
                  <option value="Good" disabled={disabledOptions.includes("Good")}>
                    Good
                  </option>
                  <option value="Best" disabled={disabledOptions.includes("Best")}>
                    Best
                  </option>
                </select>
              ) : (
                <input
                  type="text"
                  name={`baseline`}
                  value={field.baseline}
                  onChange={(e) => handleChange(index, e, "input")}
                  placeholder={`Baseline ${index + 1} of slider type ${index + 1} if baseline needs to be ${index + 1}x `}
                />
              )}
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
      
      {buttonsVisible && (
        <div className="buttonss">
          <button onClick={handleBack} className="back-button">Back</button>
          {baselineType !== "alpha" && (
            <button onClick={addField} className="add-button">Add</button>
          )}
          {fields.length > 1 && (
            <button onClick={removeLastField} className="remove-button">Remove</button>
          )}
          <button onClick={handleSave} className="save-button">Save</button>
        </div>
      )}

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

export default Slider;