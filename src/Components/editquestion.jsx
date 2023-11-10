import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosconfig';


export default function Editquestion() {
  const [options, setOptions] =  useState([
    { given_option: '', equivalent_carbon: '' },
  ]);
  const [buttonTop, setButtonTop] = useState(650);
  const [toggleState, setToggleState] = useState(false);
  const [currentAnswerType, setCurrentAnswerType] = useState("Multiple choice");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();


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
    // Get the value of the 'question' parameter from the URL
    const questionValue = getParameterByName('question');

    // Find the input element by its ID or another selector
    const inputElement = document.getElementById('myInput');

    // Set the 'questionValue' as the placeholder for the input element
    if (inputElement) {
      inputElement.value = questionValue || 'Type Your Question Here';
    }
  }, []);

  // Fetch the question info including 'question_type' from the database
  useEffect(() => {
    handlegetquestioninfo();
  }, []);

  // Fetch options info 
  useEffect(() => {
    handlegetoptioninfo();
  }, []);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleToggleClick = () => {
    setToggleState(!toggleState);
  };

  const handleAddOption = () => {
    const newOption = { Newoption: '', NewcarbonOffsetValue: '' };
    setOptions([...options, newOption]);
    setButtonTop(buttonTop + 80);
  };

  const handleDeleteOption = (index) => {
    // Create a copy of the options array without the deleted option
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setButtonTop(buttonTop - 80);
  };

  const handleOptionChange = (index, field, value) => {
    // Update the options array with the new value for the specified field
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handlegetquestioninfo = async () => {
    const data = {
      questions: getParameterByName('question'),
    };

    try {
      const response = await axiosInstance.post('/api/questionsfind', data);

      if (response.status === 201||200) {
        // Get the 'question_type' from the response
        const questionType = response.data.type_of_question;

        // Set the 'currentAnswerType' based on the 'question_type'
        switch (questionType) {
          case 'Fill in the Blank':
            setCurrentAnswerType('Fill in the blank');
            break;
          case 'Multiple Choice':
            setCurrentAnswerType('Multiple choice');
            break;
          case 'Single Choice':
            setCurrentAnswerType('Multiple choice');
            break;
          case 'Dropdown':
            setCurrentAnswerType('Dropdown');
            break;
          case 'Slider':
            setCurrentAnswerType('Slider');
            break;
          default:
            // Set a default value or handle other cases
            setCurrentAnswerType('Default');
        }

        if(questionType=='Multiple Choice'){
            setToggleState(!toggleState);
        }

        console.log('Question fetched successfully');
      } else {
        console.log('Error fetching question info');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlegetoptioninfo = async () => {
    const data = {
      questions: getParameterByName('question'),
    };
  
    try {
      const response = await axiosInstance.post('/api/questionsfind', data);
  
      if (response.status === 201 || response.status === 200) {
        // Get the 'question_type' from the response
        const question_id = response.data.ques_id;
        const dataforoptions = {
          ques_id: question_id,
        };
        try {
          const optionresponse = await axiosInstance.post('/api/optionsfind', dataforoptions);
          if (optionresponse.status === 201 || optionresponse.status === 200) {
            const optionData = optionresponse.data;
  
            // Extract required fields" fields
            const simplifiedOptions = optionData.map(option => ({
              given_option: option.given_option,
              equivalent_carbon: option.equivalent_carbon,
            }));
  
            setOptions(simplifiedOptions);
            console.log('Options fetched successfully');
          } else {
            console.log('Error fetching options info');
          }
        } catch (error) {
          console.error('Error for options:', error);
        }
  
        console.log('Question fetched successfully');
      } else {
        console.log('Error fetching question info');
      }
    } catch (error) {
      console.error('Error for questions:', error);
    }
  };

  const handleNextPage = (currentAnswerType) => {
    // Use the `navigate` function to go to the next page and pass the question as a URL parameter
    navigate(`/questions/${currentAnswerType}?question=${getParameterByName('question')}&source=edit`);
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

  return (
    <div style={{ background: 'white'}}>
    <div style={{width: 1239, height: 754, left: 79, top: 107, position: 'absolute'}}>
         <div style={{width: 1166.66, height: 111, left: 40, top: 20, position: 'absolute'}}> 
    <div style={{width: 1166.66, height: 100, left: 0, top: 0, position: 'absolute', background: '#84D2F3', borderRadius: 15}}></div>
    <input type="text" id="myInput" style={{ width: 1019, height: 50, left: 35, top: 25, position: "absolute", color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "400", wordWrap: "break-word", border: "1px solid #ccc", padding: "10px", borderRadius: "30" }} />
        </div>
        
        <div style={{left: 880, top: 148, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Allow Multiple Answers: </div>
        <div style={{ width: 64, height: 32, left: 1100, top: 145, position: 'absolute', background: 'white',  justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', cursor: 'pointer' }} onClick={handleToggleClick}>
        <div style={{ width: 64, height: 32, justifyContent: toggleState ? 'flex-end' : 'flex-start', alignItems: 'center', background: toggleState ? 'green' : '#D9D9D9', borderRadius: '10%', transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',display: 'flex',justifyContent: toggleState ? 'flex-end' : 'flex-start',alignItems: 'center' }}>
        <div style={{ width: 24, height: 24, background: 'white', borderRadius: '50%',border: '0.1px solid black', }}></div>
        </div>
      </div>
    </div>
    <div style={{left: 179, top: dropdownOpen ? 500 : 350, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Edit your Values here:</div>

      {/* Render the options dynamically */}
      {options.map((option, index) => (
        <div key={index} style={{ width: 863, height: 417, left: 254, top: dropdownOpen ? 540 + index * 70 : 380 + index * 70, position: 'absolute' }}>
          <div style={{ width: 863, height: 417, left: 0, top: 0, position: 'absolute' }}>
            <div style={{ width: 863, height: 417, left: 0, top: 0, position: 'absolute', background: 'white' }} />
          </div>
          <div style={{ width: 200, height: 250, left: 22, top: 21, position: 'absolute' }}>
            <input
              type="text"
              placeholder="New Option"
              style={{ width: '244.06px', height: '29px', left: 50, top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}
              value={option.given_option}
              onChange={(e) => handleOptionChange(index, 'given_option', e.target.value)}
            />
            <input
              type="text"
              placeholder="New CarbonOffset Value"
              style={{ width: '272.78px', height: '29px', left: '441.87px', top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)' }}
              value={option.equivalent_carbon}
              onChange={(e) => handleOptionChange(index, 'equivalent_carbon', e.target.value)}
            />
          </div>
          <div style={{ width: 75, height: 29, left: 810, top: 20, position: 'absolute' }}>
            <div style={{ width: 75, height: 29, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }} onClick={() => handleDeleteOption(index)}>
              <div style={{ width: 75, height: 29, left: 10, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}>Delete</div>
              </div>

</div>
        </div>
      ))}
       {/* Add an option button */}
       <div style={{ width: 151.56, height: 57.11, left: 610, top: dropdownOpen ? buttonTop+200 : buttonTop, position: 'absolute' }}>
          <div
            style={{ width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }}
            onClick={handleAddOption}
          >
            <div style={{ width: 139.56, height: 25.50, left: 12, top: 16, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}>Add an option</div>
          </div>
        </div>
        <div style={{width: 189.56, height: 57.11, left: 1128, top: dropdownOpen ? buttonTop+200 : buttonTop, position: 'absolute'}}>
        <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid'}}></div>
        <div style={{width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word'}}>SAVE</div>
    </div>
    <div style={{width: 189.56, height: 57.11, left: 160, top: dropdownOpen ? buttonTop+200 : buttonTop, position: 'absolute'}}>
        <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid'}}></div>
        <div style={{width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word'}}>BACK</div>
    </div>

    <div style={{ width: 346, height: 61, left: 190, top: 253, position: "absolute", color: "black", fontSize: 20, fontFamily: "Inter", fontWeight: "700", wordWrap: "break-word" }}>Current answer type:
  <div style={{ width: 345, padding: 10, left: 0, top: 26, position: "absolute", borderRadius: 4, border: "1px black solid", justifyContent: "space-between", alignItems: "center", display: "inline-flex" }} onClick={handleDropdownClick}>
    <div style={{ color: "black", fontSize: 15, fontFamily: "Inter", fontWeight: "500", wordWrap: "break-word" }}>{currentAnswerType}</div>
    <div style={{ marginLeft: "auto", fontSize: 20, lineHeight: "0", cursor: "pointer" }}>{dropdownOpen ? "▲" : "▼"}</div>
  </div>
  {dropdownOpen && (
    <div style={{ left: 0, top: 61, position: "absolute", borderRadius: 4, overflow: "hidden", border: "1px black solid", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
      <div style={{ width: 345, padding: 10, borderBottom: "1px black solid", justifyContent: "flex-start", alignItems: "center", gap: 10, display: "inline-flex", cursor: "pointer" }} onClick={() => { setCurrentAnswerType("Multiple choice"); setDropdownOpen(false); }}>
        <div style={{ color: "black", fontSize: 15, fontFamily: "Inter", fontWeight: "500", wordWrap: "break-word" }}onClick={() => handleNextPage('multiplechoice')}>Multiple choice</div>
      </div>
      <div style={{ width: 345, padding: 10, borderBottom: "1px black solid", justifyContent: "flex-start", alignItems: "center", gap: 10, display: "inline-flex", cursor: "pointer" }} onClick={() => { setCurrentAnswerType("Fill in the blank"); setDropdownOpen(false); }}>
        <div style={{ color: "black", fontSize: 15, fontFamily: "Inter", fontWeight: "500", wordWrap: "break-word" }}onClick={() => handleNextPage('fillintheblanks')}>Fill in the blank</div>
      </div>
      <div style={{ width: 345, padding: 10, borderBottom: "1px black solid", justifyContent: "flex-start", alignItems: "center", gap: 10, display: "inline-flex", cursor: "pointer" }} onClick={() => { setCurrentAnswerType("Dropdown"); setDropdownOpen(false); }}>
        <div style={{ color: "black", fontSize: 15, fontFamily: "Inter", fontWeight: "500", wordWrap: "break-word" }}onClick={() => handleNextPage('dropdown')}>Dropdown</div>
      </div>
      <div style={{ width: 345, padding: 10, borderBottom: "1px black solid", justifyContent: "flex-start", alignItems: "center", gap: 10, display: "inline-flex", cursor: "pointer" }} onClick={() => { setCurrentAnswerType("Slider"); setDropdownOpen(false); }}>
        <div style={{ color: "black", fontSize: 15, fontFamily: "Inter", fontWeight: "500", wordWrap: "break-word" }}onClick={() => handleNextPage('slider')}>Slider</div>
      </div>
    </div>
  )}
</div>
</div>
  );
}
