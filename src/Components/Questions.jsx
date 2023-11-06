import "./question.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function Questions(props) {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const handleaddquestion = () => {
    navigate("/questions/add");
  };

  

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/questions");
      console.log(response);
  
      // Check if response.data is an array before mapping
      const updatedQuestions = Array.isArray(response.data)
        ? response.data.map((question) => ({
            ...question,
            toggleState: question.question_flag?.data[0] === 1, // Check if question_flag is defined
          }))
        : [];
  
      setQuestions(updatedQuestions); // Set the questions in state
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleToggleClick = async (index) => {
    const newQuestions = [...questions];
    newQuestions[index].toggleState = !newQuestions[index].toggleState;
    setQuestions(newQuestions);

    // Make an HTTP request to update the database
    try {
      const updatedState = newQuestions[index].toggleState ? 1 : 0;
      await axios.post("http://localhost:3001/api/updateToggleState", {
        questionId: newQuestions[index].ques_id,
        newState: updatedState,
      });
      console.log("Toggle state updated in the database.");
    } catch (error) {
      console.error("Error updating toggle state in the database:", error);
    }
  };

  return (
    <div style={{width: 1440, height: 1706, position: 'relative', background: 'white'}}>
    <div style={{width: 585, height: 659, left: 751, top: 221, position: 'absolute'}} />
    <div style={{width: 1185, height: 1415, left: 106, top: 10, position: 'absolute', background: 'rgba(217, 217, 217, 0.12)', borderRadius: 30}} />
    <div style={{width: 1164, height: 1290, left: 137, top: 100, position: 'absolute'}}>
    
     <div style={{ left: 500, top: -50, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word' }}>Questions</div>
        {questions.map((question, index) => (
          <div key={question.ques_id} style={{ width: 1159, height: 111, left: -10, top: 10 + index * 131, position: 'absolute' }}>
             <div style={{width: 1158.67, height: 111, left: 0, top: 0, position: 'absolute', background: '#84D2F3', borderRadius: 15}}></div>
             <div style={{ width: 873, height: 51, left: 85.82, top: 31, position: 'absolute', background: 'white', borderRadius: 300 }}>
      <div style={{ width: 1000, height: 31,left: 25, top: 10, color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word', position: 'relative'}}>
        {question.questionContent}
      </div>
    </div>      <div style={{width: 173, height: 57, left: 975, top: 31, position: 'absolute', background: '#F6A55A', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid'}}></div>
      <div  onClick={()=>navigate("/contact/"+question.id)} style={{width: 37, left: 1040, top: 50, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word',cursor: 'pointer',} }>Edit</div>
     <div style={{ width: 64, height: 32, left: 3, top: 40, position: 'absolute', background: 'white', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', cursor: 'pointer', }} onClick={() => handleToggleClick(index)}>
      <div style={{ width: 64, height: 32, justifyContent: question.toggleState ? 'flex-end' : 'flex-start', alignItems: 'center', background: question.toggleState ? 'green' : 'white', borderRadius: '10%', transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out', display: 'flex', justifyContent: question.toggleState ? 'flex-end' : 'flex-start', alignItems: 'center', }}>
        <div style={{ width: 24, height: 24, background: 'white', borderRadius: '50%',border: '0.1px solid black', }}></div>
      </div>
    </div>
          </div>
        ))}
   </div>
   <div style={{width: 150.66, height: 57.11, left: 1159, top: 0, position: 'absolute'}}>
      <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#A3C7A0', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid'}}></div>
      <div style={{width: 139.56, height: 25.50, left: 9, top: 14, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word',cursor: 'pointer'}}onClick={handleaddquestion}>Add a question</div>
    </div>
    
    

   
  </div>
  );
}
export default Questions;
