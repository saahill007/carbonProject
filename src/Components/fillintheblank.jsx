import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FillInTheBlank() {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();
    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };
    const handleback = () => {
        navigate("/questions/add");
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
        // Get the value of the 'question' parameter from the URL
        const questionValue = getParameterByName('question');
    
        // Find the input element by its ID or another selector
        const inputElement = document.getElementById('myInput');
    
        // Set the 'questionValue' as the placeholder for the input element
        if (inputElement) {
          inputElement.value = questionValue || 'Default Placeholder';
        }
      }, []);
  return (
    <div style={{background: 'white'}}>
    {/* <div style={{width: 110, height: 29, left: 944, top: 400, position: 'absolute'}}></div> */}
    <div style={{width: 1166.66, height: 111, left: 130, top: 120, position: 'absolute',zIndex: 2}}> 
    <div style={{width: 1166.66, height: 111, left: 0, top: 0, position: 'absolute', background: '#84D2F3', borderRadius: 15}}></div>
        <input type="text" id="myInput" style={{width: 1019,height: 51,left: 70,top: 25,position: "absolute",color: "black",fontSize: 20,fontFamily: "Outfit",fontWeight: "400",wordWrap: "break-word",border: "1px solid #ccc",padding: "10px", borderRadius: "30" }}/>
        </div>

    <div style={{width: 1266.66, height: 754, left: 100, top: 100, position: 'absolute'}}>
        <div style={{width: 1239, height: 754, left: 0, top: 0, position: 'absolute', background: 'rgba(217, 217, 217, 0.12)', borderRadius: 30}} />
        <div style={{width: 604, height: 51, left: 170, top: 276, position: 'absolute'}}>
            <div style={{width: 604, height: 51, left: 18, top: 13, position: 'absolute', background: 'white'}} />
            <input type='text' placeholder='Type the carbon offset value' style={{width: 604, left: 18, top: 13, position: 'absolute', color: 'rgba(0, 0, 0, 0.47)', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}></input>
        </div>
        <div style={{width: 604, height: 51, left: 170, top: 183, position: 'absolute'}}>
            <div style={{width: 604, height: 51, left: 18, top: 20, position: 'absolute', background: 'white'}} />
            <input type='text' placeholder='Type your answer' style={{width: 604, left: 18, top: 13, position: 'absolute', color: 'rgba(0, 0, 0, 0.47)', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}></input>
        </div>
    </div>
    <div style={{left: 300, top: 478, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Please select the text type below:</div>
    <div style={{ width: 457, height: 25, left: 300, top: 538, position: "absolute", justifyContent: "flex-start", alignItems: "center", gap: 20, display: "inline-flex" }} onClick={() => handleOptionClick("Numeric")}>
  <div style={{ width: 45, height: 40, position: "relative", background: "white", borderRadius: "50%", border: "1px #828282 solid", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {selectedOption === "Numeric" && (
      <div style={{ width: 24, height: 24, background: "black", borderRadius: "50%" }} />
    )}
    {selectedOption !== "Numeric" && (
      <div style={{ width: 24, height: 24, background: "gray", borderRadius: "50%" }} />
    )}
  </div>
  <div style={{ width: 457, height: 29, color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "500", wordWrap: "break-word" }}>Numeric</div>
</div>

<div style={{ width: 457, height: 25, left: 500, top: 538, position: "absolute", justifyContent: "flex-start", alignItems: "center", gap: 20, display: "inline-flex" }} onClick={() => handleOptionClick("Alphabetic")}>
  <div style={{ width: 45, height: 40, position: "relative", background: "white", borderRadius: "50%", border: "1px #828282 solid", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {selectedOption === "Alphabetic" && (
      <div style={{ width: 24, height: 24, background: "black", borderRadius: "50%" }} />
    )}
    {selectedOption !== "Alphabetic" && (
      <div style={{ width: 24, height: 24, background: "gray", borderRadius: "50%" }} />
    )}
  </div>
  <div style={{ width: 457, height: 29, color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "500", wordWrap: "break-word" }}>Alphabetic</div>
</div>

<div style={{ width: 457, height: 25, left: 700, top: 538, position: "absolute", justifyContent: "flex-start", alignItems: "center", gap: 20, display: "inline-flex" }} onClick={() => handleOptionClick("Both")}>
  <div style={{ width: 45, height: 40, position: "relative", background: "white", borderRadius: "50%", border: "1px #828282 solid", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {selectedOption === "Both" && (
      <div style={{ width: 24, height: 24, background: "black", borderRadius: "50%" }} />
    )}
    {selectedOption !== "Both" && (
      <div style={{ width: 24, height: 24, background: "gray", borderRadius: "50%" }} />
    )}
  </div>
  <div style={{ width: 457, height: 29, color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "500", wordWrap: "break-word" }}>Both</div>
</div>

    <div style={{width: 189.56, height: 57.11, left: 162, top: 643, position: 'absolute'}}>
            <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid',cursor:'pointer'}}></div>
            <div style={{width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word'}}onClick={handleback}>BACK</div>
        </div>

        <div style={{width: 189.56, height: 57.11, left: 1132, top: 643, position: 'absolute'}}>
            <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid',cursor:'pointer'}}></div>
            <div style={{width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word'}}>SAVE</div>
        </div>

</div>
  );
}
