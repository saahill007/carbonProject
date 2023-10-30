// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";


// export default function MultipleChoice() {
//   const [toggleState, setToggleState] = useState(false);
//   const [options, setOptions] = useState([
//     { index: '', option: '', carbonOffsetValue: '' },
//     { index: '', option: '', carbonOffsetValue: '' },
//   ]);
//   const [buttonTop, setButtonTop] = useState(653); // Initial top position of buttons
//   const navigate = useNavigate();
//   const [isSaveAttempted, setIsSaveAttempted] = useState(false);
//   const [inputErrors, setInputErrors] = useState(Array(options.length).fill({ option: false, carbonOffsetValue: false }));
  

//   const [message, setMessage] = useState(null); // State for displaying messages

//   const handleback = () => {
//     navigate("/questions/add");
//   };
  
  
//   // Function to handle toggle switch click
//   const handleToggleClick = () => {
//     setToggleState(!toggleState);
//   };
//   const handleAddOption = () => {
//     const newOption = { index: '', option: '', carbonOffsetValue: '' };
//     setOptions([...options, newOption]);
//     // Move the buttons down
//     setButtonTop(buttonTop + 80);
//   };

// //   const handleDeleteOption = (index) => {
// //     // Create a copy of the options array without the deleted option
// //     const updatedOptions = options.filter((_, i) => i !== index);
// //       setOptions(updatedOptions);
// //       setButtonTop(buttonTop - 80);
// //   };
  
  
// //   const handleOptionChange = (index, field, value) => {
// //     if (field === 'carbonOffsetValue') {
// //       // Use a regular expression to check if the value consists only of numeric characters
// //       if (!/^\d*$/.test(value)) {
// //         // If it's not a numeric value, don't update the state
// //         return;
// //       }
// //     }
  
// //    // Update the options array with the new value for the specified field
// //     const updatedOptions = [...options];
// //     updatedOptions[index][field] = value;
// //     setOptions(updatedOptions);
// //   };
  
// //   function getParameterByName(name, url) {
// //     if (!url) url = window.location.href;
// //     name = name.replace(/[\[\]]/g, '\\$&');
// //     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
// //     var results = regex.exec(url);
// //     if (!results) return null;
// //     if (!results[2]) return '';
// //     return decodeURIComponent(results[2].replace(/\+/g, ' '));
// //   }

// //   useEffect(() => {
// //     // Get the value of the 'question' parameter from the URL
// //     const questionValue = getParameterByName('question');

// //     // Find the input element by its ID or another selector
// //     const inputElement = document.getElementById('myInput');

//     // Set the 'questionValue' as the placeholder for the input element
//     if (inputElement) {
//       inputElement.value = questionValue || 'Type Your Question Here';
//     }
//   }, []);

//   const handleSave = async () => {
//     const isMultipleChoice = toggleState; 
//     setIsSaveAttempted(true); 

//      // Update the inputErrors array based on user input and the save attempt
//      const updatedInputErrors = options.map((option) => ({
//       option: !option.option && isSaveAttempted, // Show error if empty and save attempted
//       carbonOffsetValue: !option.carbonOffsetValue && isSaveAttempted, // Show error if empty and save attempted
//     }));

//     setInputErrors(updatedInputErrors);

//     // Check if there are any errors
//     const hasErrors = updatedInputErrors.some((errors) => errors.option || errors.carbonOffsetValue);

//     if (hasErrors) {
//       // Display an error message and return without saving
//       setMessage('Please enter all the required values.');
//       setTimeout(() => {
//         setMessage(null);
//       }, 2000);
//       return;
//     }
//     const optionsData = options.map((option, index) => {
//       let optiontype = '';
  
// //       if (/^[a-zA-Z]+$/.test(option.option)) {
// //         optiontype = 'Alphabetic';
// //       } else if (/^\d+$/.test(option.option)) {
// //         optiontype = 'Numeric';
// //       } else if (/^[a-zA-Z\d]+$/.test(option.option)) {
// //         optiontype = 'Alphanumeric';
// //       }
  
// //       return {
// //         option: option.option,
// //         optiontype,
// //         carbonOffset: option.carbonOffsetValue,
// //       };
// //     });
// //     const data = {
// //       question: document.getElementById('myInput').value,
// //       question_flag: 0,
// //       type_of_question: isMultipleChoice?'Multiple Choice':'Single Choice', 
// //       options: optionsData, 
// //     };

// //     try {
// //       const response = await axiosInstance.post('/api/question/multiplechoice', data);
  
// //       if (response.status === 201) {
// //         setMessage('Question and Options added successfully.');
// //       setTimeout(() => {
// //         setMessage(null); // Clear the message after 2 seconds
// //       }, 2000);
// //       } else {
// //         setMessage('Error adding the question.');
// //       setTimeout(() => {
// //         setMessage(null); // Clear the message after 2 seconds
// //       }, 2000);
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //       setMessage('Error updating the question.');
// //       setTimeout(() => {
// //         setMessage(null); // Clear the message after 2 seconds
// //       }, 2000);
// //     }
// //   };

// //   return (
// //     <div>
// //     <div style={{background: 'white'}}>
// //     <div style={{width: 1239, height: 760, left: 93, top: 100, position: 'absolute'}}>
// //     {/* <div style={{width: 1239, height: 754, left: 0, top: -25, position: 'absolute', background: 'rgba(217, 217, 217, 0.12)', borderRadius: 30}} /> */}
// //           <div style={{width: 1166.66, height: 111, left: 40, top: 20, position: 'absolute'}}> 
// //     <div style={{width: 1166.66, height: 111, left: 0, top: 0, position: 'absolute', background: '#84D2F3', borderRadius: 15}}></div>
// //     <input type="text" id="myInput" style={{ width: 1019, height: 51, left: 30, top: 25, position: "absolute", color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "400", wordWrap: "break-word", border: "1px solid #ccc", padding: "10px", borderRadius: "30" }} />
// //         </div>
// //         <div style={{left: 117, top: 143, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Allow Multiple Answers: </div>
// //         <div style={{ width: 64, height: 32, left: 325, top: 145, position: 'absolute', background: 'white',  justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', cursor: 'pointer' }} onClick={handleToggleClick}>
// //         <div style={{ width: 64, height: 32, justifyContent: toggleState ? 'flex-end' : 'flex-start', alignItems: 'center', background: toggleState ? 'green' : '#D9D9D9', borderRadius: '10%', transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',display: 'flex',justifyContent: toggleState ? 'flex-end' : 'flex-start',alignItems: 'center' }}>
// //         <div style={{ width: 24, height: 24, background: 'white', borderRadius: '50%',border: '0.1px solid black', }}></div>
// //         </div>
// //       </div>
// //     </div>

// //      {/* Headers */}
// //      <div style={{ width: 863, height: 250.11, left: 270, top: 298, position: 'absolute' }}>
// //           <div style={{ width: 333.40, height: 24.38, left: 442, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}>Set Carbon offset Value</div>
// //           <div style={{ width: 253.64, height: 24.38, left: 60, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}>Your New Options</div>
// //           {/* <div style={{ width: 78.16, height: 24.38, left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}>Index</div> */}
// //         </div>
// //     {/* Render the options dynamically */}
// //     {options.map((option, index) => (
// //         <div key={index} style={{ width: 863, height: 417, left: 254, top: 328 + index * 70, position: 'absolute' }}>
// //           <div style={{ width: 863, height: 417, left: 0, top: 0, position: 'absolute' }}>
// //             <div style={{ width: 863, height: 417, left: 0, top: 0, position: 'absolute', background: 'white' }} />
// //           </div>
// //           <div style={{ width: 200, height: 250, left: 22, top: 21, position: 'absolute' }}>
// // <<<<<<< HEAD
            
// //             <input
// //               type="text"
// //               placeholder="Option"
// //               style={{ width: '244.06px', height: '29px', left: 50, top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}
// //               value={option.option}
// //               onChange={(e) => handleOptionChange(index, 'option', e.target.value)}
// //             />
// //             <input
// //               type="text"
// //               placeholder="CarbonOffset Value"
// //               style={{ width: '272.78px', height: '29px', left: '441.87px', top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)' }}
// //               value={option.carbonOffsetValue}
// //               onChange={(e) => handleOptionChange(index, 'carbonOffsetValue', e.target.value)}
// //             />
// //           </div>
// // =======
// //             {/* <input
// //               type="text"
// //               placeholder="Index"
// //               style={{ width: '60px', height: '29px', left: '0', top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)' }}
// //               value={option.index}
// //               onChange={(e) => handleOptionChange(index, 'index', e.target.value)}
// //             /> */}
// //               <input
// //             type="text"
// //             placeholder="Option"
// //             style={{
// //               width: '244.06px',
// //               height: '29px',
// //               left: 50,
// //               top: '0px',
// //               position: 'absolute',
// //               color: 'rgba(0, 0, 0, 0.47)',
// //               fontSize: 20,
// //               fontFamily: 'Outfit',
// //               fontWeight: '500',
// //               wordWrap: 'break-word',
// //               borderColor: (inputErrors[index].option || (isSaveAttempted && !option.option)) ? 'red' : 'rgba(0, 0, 0, 0.47)',
// //             }}
// //             value={option.option}
// //             onChange={(e) => handleOptionChange(index, 'option', e.target.value)}
// //           />
// //            <input
// //             type="text"
// //             placeholder="CarbonOffset Value"
// //             style={{
// //               width: '272.78px',
// //               height: '29px',
// //               left: '441.87px',
// //               top: '0px',
// //               position: 'absolute',
// //               color: 'rgba(0, 0, 0, 0.47)',
// //               borderColor: (inputErrors[index].carbonOffsetValue || (isSaveAttempted && !option.carbonOffsetValue)) ? 'red' : 'rgba(0, 0, 0, 0.47)',
// //             }}
// //             value={option.carbonOffsetValue}
// //             onChange={(e) => handleOptionChange(index, 'carbonOffsetValue', e.target.value)}
// //           />

// //           {/* {inputErrors[index].option && (
// //         <div style={{ color: 'red', fontSize: 12, position: 'absolute', top: 30, left: 50 }}>
// //           Please enter an option.
// //         </div>
// //       )}
// //       {inputErrors[index].carbonOffsetValue && (
// //         <div style={{ color: 'red', fontSize: 12, position: 'absolute', top: 30, left: '441.87px' }}>
// //           Please enter a numeric value.
// //         </div>
// //       )} */}
// //     </div>
// // >>>>>>> 8e45aa03e010cd49d185fa365b420db6a5362a05
// //           <div style={{ width: 75, height: 29, left: 810, top: 20, position: 'absolute' }}>
// //             <div style={{ width: 75, height: 29, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }} onClick={() => handleDeleteOption(index)}>
// //               <div style={{ width: 75, height: 29, left: 10, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}>Delete</div>
// //               </div>

// // </div>
// //         </div>
// //       ))}
// //         {/* Add an option button */}
// //         <div style={{ width: 151.56, height: 57.11, left: 610, top: buttonTop, position: 'absolute' }}>
// //           <div
// //             style={{ width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }}
// //             onClick={handleAddOption}
// //           >
// //             <div style={{ width: 139.56, height: 25.50, left: 12, top: 16, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}>Add an option</div>
// //           </div>
// //         </div>
// //     {/* SAVE button */}
// //     <div style={{ width: 189.56, height: 57.11, left: 1104, top: buttonTop, position: 'absolute' }}>
// //           <div style={{ width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }}></div>
// //           <div style={{ width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }} onClick={() => handleSave()}>SAVE</div>
// //         </div>
// //      {/* BACK button */}
// //      <div style={{ width: 189.56, height: 57.11, left: 93, top: buttonTop, position: 'absolute' }}>
// //           <div style={{ width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }}></div>
// //           <div style={{ width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}onClick={handleback}>BACK</div>
// //         </div>
// // </div>
// //  {/* Message Display */}
// //  {message && (
// //         <div style={{ position: 'absolute', bottom: 20, left: '48%', transform: 'translateX(-50%)' }}>
// //           <div
// //             style={{
// //               background: message.includes('Error') ? 'red' : '#A3C7A0',
// //               color: 'white',
// //               padding: '10px',
// //               borderRadius: '5px',
// //             }}
// //           >
// //             {message}
// //           </div>
// //         </div>
// //       )}
// // </div>
// //   );

// import React from 'react'

// const multiplechoice = () => {
//   return (
//     <div>
//     <div style={{background: 'white'}}>
//     <div style={{width: 1239, height: 760, left: 93, top: 100, position: 'absolute'}}>
//     {/* <div style={{width: 1239, height: 754, left: 0, top: -25, position: 'absolute', background: 'rgba(217, 217, 217, 0.12)', borderRadius: 30}} /> */}
//           <div style={{width: 1166.66, height: 111, left: 40, top: 20, position: 'absolute'}}> 
//     <div style={{width: 1166.66, height: 111, left: 0, top: 0, position: 'absolute', background: '#84D2F3', borderRadius: 15}}></div>
//     <input type="text" id="myInput" style={{ width: 1019, height: 51, left: 30, top: 25, position: "absolute", color: "black", fontSize: 20, fontFamily: "Outfit", fontWeight: "400", wordWrap: "break-word", border: "1px solid #ccc", padding: "10px", borderRadius: "30" }} />
//         </div>
//         <div style={{left: 117, top: 143, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Allow Multiple Answers: </div>
//         <div style={{ width: 64, height: 32, left: 325, top: 145, position: 'absolute', background: 'white',  justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', cursor: 'pointer' }} onClick={handleToggleClick}>
//         <div style={{ width: 64, height: 32, justifyContent: toggleState ? 'flex-end' : 'flex-start', alignItems: 'center', background: toggleState ? 'green' : '#D9D9D9', borderRadius: '10%', transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',display: 'flex',justifyContent: toggleState ? 'flex-end' : 'flex-start',alignItems: 'center' }}>
//         <div style={{ width: 24, height: 24, background: 'white', borderRadius: '50%',border: '0.1px solid black', }}></div>
//         </div>
//       </div>
//     </div>

//      {/* Headers */}
//      <div style={{ width: 863, height: 250.11, left: 270, top: 298, position: 'absolute' }}>
//           <div style={{ width: 333.40, height: 24.38, left: 442, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}>Set Carbon offset Value</div>
//           <div style={{ width: 253.64, height: 24.38, left: 60, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}>Your New Options</div>
//           {/* <div style={{ width: 78.16, height: 24.38, left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}>Index</div> */}
//         </div>
//     {/* Render the options dynamically */}
//     {options.map((option, index) => (
//         <div key={index} style={{ width: 863, height: 417, left: 254, top: 328 + index * 70, position: 'absolute' }}>
//           <div style={{ width: 863, height: 417, left: 0, top: 0, position: 'absolute' }}>
//             <div style={{ width: 863, height: 417, left: 0, top: 0, position: 'absolute', background: 'white' }} />
//           </div>
//           <div style={{ width: 200, height: 250, left: 22, top: 21, position: 'absolute' }}>
//             {/* <input
//               type="text"
//               placeholder="Index"
//               style={{ width: '60px', height: '29px', left: '0', top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)' }}
//               value={option.index}
//               onChange={(e) => handleOptionChange(index, 'index', e.target.value)}
//             /> */}
//             <input
//               type="text"
//               placeholder="Option"
//               style={{ width: '244.06px', height: '29px', left: 50, top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }}
//               value={option.option}
//               onChange={(e) => handleOptionChange(index, 'option', e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="CarbonOffset Value"
//               style={{ width: '272.78px', height: '29px', left: '441.87px', top: '0px', position: 'absolute', color: 'rgba(0, 0, 0, 0.47)' }}
//               value={option.carbonOffsetValue}
//               onChange={(e) => handleOptionChange(index, 'carbonOffsetValue', e.target.value)}
//             />
//           </div>
//           <div style={{ width: 75, height: 29, left: 810, top: 20, position: 'absolute' }}>
//             <div style={{ width: 75, height: 29, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }} onClick={() => handleDeleteOption(index)}>
//               <div style={{ width: 75, height: 29, left: 10, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}>Delete</div>
//               </div>

// </div>
//         </div>
//       ))}
//         {/* Add an option button */}
//         <div style={{ width: 151.56, height: 57.11, left: 610, top: buttonTop, position: 'absolute' }}>
//           <div
//             style={{ width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }}
//             onClick={handleAddOption}
//           >
//             <div style={{ width: 139.56, height: 25.50, left: 12, top: 16, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}>Add an option</div>
//           </div>
//         </div>
//     {/* SAVE button */}
//     <div style={{ width: 189.56, height: 57.11, left: 1104, top: buttonTop, position: 'absolute' }}>
//           <div style={{ width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }}></div>
//           <div style={{ width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }} onClick={() => handleSave()}>SAVE</div>
//         </div>
//      {/* BACK button */}
//      <div style={{ width: 189.56, height: 57.11, left: 93, top: buttonTop, position: 'absolute' }}>
//           <div style={{ width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid' }}></div>
//           <div style={{ width: 139.56, height: 25.50, left: 50, top: 16.18, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word', cursor: 'pointer' }}onClick={handleback}>BACK</div>
//         </div>
// </div>
//  {/* Message Display */}
//  {message && (
//         <div style={{ position: 'absolute', bottom: 20, left: '48%', transform: 'translateX(-50%)' }}>
//           <div
//             style={{
//               background: message.includes('Error') ? 'red' : '#A3C7A0',
//               color: 'white',
//               padding: '10px',
//               borderRadius: '5px',
//             }}
//           >
//             {message}
//           </div>
//         </div>
//       )}
// </div>
//   );
// }
