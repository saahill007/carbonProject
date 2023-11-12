import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import axiosInstance from '../axiosconfig';


export default function FillInTheBlank() {
    const [selectedOption, setSelectedOption] = useState('');
    const [answer, setAnswer] = useState(''); 
    const [carbonOffsetValue, setCarbonOffsetValue] = useState(''); 
    const [selectedTextType, setSelectedTextType] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState(null); 

    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };
    const handleback = () => {
      const questionValue = getParameterByName('question');
      const source = getParameterByName('source');
      if (source === 'add') {
        navigate(`/questions/add?question=${questionValue}`);
      } else if (source === 'edit') {
        navigate(`/questions/edit?question=${questionValue}`);
      }
    };
    

      const handleTextTypeSelect = (textType) => {
        setSelectedTextType(textType);
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
        const questionValue = getParameterByName('question');
        const inputElement = document.getElementById('myInput');
        if (inputElement) {
          inputElement.value = questionValue || 'Type Your Question Here';
        }
      }, []);

      const handleSave = async () => {
        const data = {
          question: document.getElementById('myInput').value,
          carbonOffsetValue,
          answer,
          selectedTextType
        };
    
        try {
          const response = await axiosInstance.post('/api/question/fillintheblank', data);
      
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
  return (
    <div style={{background: 'white' }}>
    {/* <div style={{width: 110, height: 29, left: 944, top: 400, position: 'absolute'}}></div> */}
    <div style={{width: 1166.66, height: 111, left: 130, top: 120, position: 'absolute',zIndex: 2}}> 
    <div style={{width: 1166.66, height: 111, left: 0, top: 0, position: 'absolute', background: '#84D2F3', borderRadius: 15}}></div>
    <input type="text" id="myInput" style={{ width: 1019, height: 51, left: 30, top: 25, position: "absolute", color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "400", wordWrap: "break-word", border: "1px solid #ccc", padding: "10px", borderRadius: "30" }} />
        </div>

    {/* <div style={{width: 1266.66, height: 754, left: 100, top: 100, position: 'absolute'}}> */}
        {/* <div style={{width: 1239, height: 754, left: 100, top: 100, position: 'absolute', background: 'rgba(217, 217, 217, 0.12)', borderRadius: 30}} /> */}
        <div style={{width: 604, height: 51, left: 170, top: 376, position: 'absolute'}}>
            <div style={{width: 604, height: 51, left: 18, top: 13, position: 'absolute', background: 'white'}} />
            <input type='text' placeholder='Type the carbon offset value' value={carbonOffsetValue} onInput={(e) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
        setCarbonOffsetValue(e.target.value);
    }} style={{width: 604, left: 18, top: 13, position: 'absolute', color: 'rgba(0, 0, 0, 0.47)', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}></input>
        </div>
        <div style={{width: 604, height: 51, left: 170, top: 283, position: 'absolute'}}>
            <div style={{width: 604, height: 51, left: 18, top: 20, position: 'absolute', background: 'white'}} />
            <input type='text' placeholder='Type your answer range' value={answer} onChange={(e) => setAnswer(e.target.value)}  style={{width: 604, left: 18, top: 13, position: 'absolute', color: 'rgba(0, 0, 0, 0.47)', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}></input>
        </div>
    {/* </div> */}
    <div style={{left: 200, top: 478, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Please select the text type below:</div>
    <div style={{ width: 457, height: 25, left: 300, top: 538, position: "absolute", justifyContent: "flex-start", alignItems: "center", gap: 20, display: "inline-flex" }} onClick={() => handleOptionClick("Numeric")}>
    <div style={{ width: 45, height: 40, position: "relative", background: "white", borderRadius: "50%", border: "1px #828282 solid", display: "flex", alignItems: "center", justifyContent: "center" }}onClick={() => handleTextTypeSelect("Numeric")}>    {selectedOption === "Numeric" && (
      <div style={{ width: 24, height: 24, background: "black", borderRadius: "50%" }} />
    )}
    {selectedOption !== "Numeric" && (
      <div style={{ width: 24, height: 24, background: "gray", borderRadius: "50%" }} />
    )}
  </div>
  <div style={{ width: 457, height: 29, color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "500", wordWrap: "break-word" }}>Numeric</div>
</div>

<div style={{ width: 457, height: 25, left: 500, top: 538, position: "absolute", justifyContent: "flex-start", alignItems: "center", gap: 20, display: "inline-flex" }} onClick={() => handleOptionClick("Alphabetic")}>
<div style={{ width: 45, height: 40, position: "relative", background: "white", borderRadius: "50%", border: "1px #828282 solid", display: "flex", alignItems: "center", justifyContent: "center" }}onClick={() => handleTextTypeSelect("Alphabetic")}>    {selectedOption === "Alphabetic" && (
      <div style={{ width: 24, height: 24, background: "black", borderRadius: "50%" }} />
    )}
    {selectedOption !== "Alphabetic" && (
      <div style={{ width: 24, height: 24, background: "gray", borderRadius: "50%" }} />
    )}
  </div>
  <div style={{ width: 457, height: 29, color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "500", wordWrap: "break-word" }}>Alphabetic</div>
</div>

<div style={{ width: 457, height: 25, left: 700, top: 538, position: "absolute", justifyContent: "flex-start", alignItems: "center", gap: 20, display: "inline-flex" }} onClick={() => handleOptionClick("Both")}>
<div style={{ width: 45, height: 40, position: "relative", background: "white", borderRadius: "50%", border: "1px #828282 solid", display: "flex", alignItems: "center", justifyContent: "center" }}onClick={() => handleTextTypeSelect("Alphanumeric")}>  
  {selectedOption === "Both" && (
      <div style={{ width: 24, height: 24, background: "black", borderRadius: "50%" }} />
    )}
    {selectedOption !== "Both" && (
      <div style={{ width: 24, height: 24, background: "gray", borderRadius: "50%" }} />
    )}
  </div>
  <div style={{ width: 457, height: 29, color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "500", wordWrap: "break-word" }}>Both</div>
</div>

    <div style={{width: 189.56, height: 57.11, left: 162, top: 643, position: 'absolute',cursor:'pointer'}}>
            <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid'}}></div>
            <div style={{width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word'}}onClick={handleback}>BACK</div>
        </div>

        <div style={{width: 189.56, height: 57.11, left: 1132, top: 643, position: 'absolute',cursor:'pointer'}}>
            <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid'}}></div>
            <div style={{width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word'}}onClick={handleSave}>SAVE</div>
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
