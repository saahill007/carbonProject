import "./question.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { apiUrlBase } from "../config";

export function Questions(props) {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const handleaddquestion = () => {
    navigate("/questions/add");
  };

  

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${apiUrlBase}/api/questions`);
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

  const handleToggleClick = async (ques_id) => {
    try {
      // Make a POST request to toggle the question state on the server
      const response = await axios.post(`${apiUrlBase}/api/toggleQuestion`, {
        ques_id,
      });

      const { enabled } = response.data;

      // Update the local state to reflect the new toggle state
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === ques_id
            ? { ...question, enabled: enabled }
            : question
        )
      );
    } catch (error) {
      console.error("Error toggling question:", error);
      // Handle error, e.g., show a message to the user
    }
  };
  return (
    <div style={{background:"white", paddingTop:""}}>
    <div style={{width:"100%", position: 'relative', background: '',marginTop:"120px" ,paddingBottom:"20px", marginBottom:"20px"}}>
   <div style={{fontWeight:"bold",fontSize:"20px",textAlign:"center"}}>Questions</div>
   <div style={{fontWeight:"bold",fontSize:"20px",textAlign:"end"}}><button className="btn btn-primary" style={{background:"#FF5701",marginRight:"11%", width:"250px", border:"1px solid #FF5701", color:"white", fontWeight:"bold"}} onClick={handleaddquestion}><i class="bi bi-plus-circle" style={{paddingRight:"10px"}}></i>Add a New Question</button>
    </div>
    {/* <button className="btn btn-primary" style={{background:"#FF5701",marginLeft:"10%", width:"250px", border:"1px solid #FF5701", color:"white", fontWeight:"bold"}} onClick={handleaddquestion}><i class="bi bi-plus-circle" style={{paddingRight:"10px"}}></i>Add a New Question</button> */}
    <div style={{width:"80%", marginLeft:"10%",position: 'absolute', marginTop:"50px"}}>
   
        {questions.map((question, index) => (
          <div key={question.id} style={{ display:"flex",width:"100%", height: 111, left: -10, top: 10 + index * 131, position: 'absolute', marginBottom:"20px" }}>
             <div style={{width:"100%", height: 111,   background: 'black', borderRadius: 15}}></div>
             <div style={{ width: "80%", height: 51, left: 85.82, top: 31, position: 'absolute', background: 'white', borderRadius: 300 }}>
                  <div style={{ width:"80%", height: 31,left: 25, top: 10, color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word', position: 'relative', marginBottom:"20px"}}>
                       {question.questionContent}
                  </div>
              </div>   
              {/* <div>
                <button className="btn btn-primary" style={{background:"#FF5701", border:"1px solid #FF5701 "}}>Edit</button>
                </div>    */}
              <button onClick={()=>navigate("/contact/"+question.id)} style={{width: "10%", height: 57, left:"70vw", top: 31, position: 'absolute', background: '#FF5701', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300,fontWeight:"bold" ,border: '1px black solid'}}>Edit</button>
      {/* <div  onClick={()=>navigate("/contact/"+question.id)} style={{width: 37, left: 1040, top: 50, background:"#FF5701", position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word',cursor: 'pointer',} }>Edit</div> */}
     <div style={{ paddingLeft:"10px",width: 64, height: 32, left: 3, top: 40, position: 'absolute', background: 'black', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', cursor: 'pointer', }} onClick={() => handleToggleClick(question.id)}>
      <div style={{ width: 64, height: 32, justifyContent: question.toggleState ? 'flex-end' : 'flex-start', alignItems: 'center', background: question.enabled ? '#FF5701' : 'white', borderRadius: '20px', transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out', display: 'flex', justifyContent: question.enabled ? 'flex-end' : 'flex-start', alignItems: 'center', }}>
        <div style={{ width: 24, height: 24, background: 'white', borderRadius: '50%',border: '0.1px solid black', }}></div>
      </div>
    </div>
          </div>
        ))}
   </div>
   {/* <div style={{width: 150.66, height: 57.11, left: 1159, top: 0, position: 'absolute'}}>
      <div style={{width: 150.66, height: 57.11, left: 0, top: 0, position: 'absolute', background: '#FF5701', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 300, border: '1px black solid'}}></div>
      <div style={{width: 139.56, height: 25.50, left: 9, top: 14, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word',cursor: 'pointer'}}onClick={handleaddquestion}>Add a question</div>
    </div> */}
    
    

   
  </div></div>
  );
}
export default Questions;
