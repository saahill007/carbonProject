import "./question.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export function Questions(props) {
  const [questions, setQuestions] = useState([]);
  // Function to fetch questions from the server
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/api/questions");
      console.log(response);
      // Map the response data to set toggleState based on question_flag
      const updatedQuestions = response.data.map((question) => ({
        ...question,
        toggleState: question.question_flag.data[0] === 1, // Set toggleState based on question_flag
      }));

      setQuestions(updatedQuestions); // Set the questions in state
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Call the fetchQuestions function when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Create an array of states to manage toggle switches
  const handleToggleClick = async (index) => {
    const newQuestions = [...questions];
    newQuestions[index].toggleState = !newQuestions[index].toggleState;
    setQuestions(newQuestions);

    // Make an HTTP request to update the database
    try {
      const updatedState = newQuestions[index].toggleState ? 1 : 0;
      await axios.post("/api/updateToggleState", {
        questionId: newQuestions[index].ques_id,
        newState: updatedState,
      });
      console.log("Toggle state updated in the database.");
    } catch (error) {
      console.error("Error updating toggle state in the database:", error);
    }
  };

  return (
    <div
  style={{
    
    position: "relative",
    background: "white",
  }}
>
  <div
    style={{
      width: 585,
      height: 659,
      left: 751,
      top: 221,
      position: "absolute",
    }}
  />
  <div
    style={{
      width: 1185,
      height: 1415,
      left: 106,
      top: 198,
      position: "absolute",
      background: "rgba(217, 217, 217, 0.12)",
      borderRadius: 30,
    }}
  />
  <div
    style={{
      width: 1164,
      height: 1290,
      left: 137,
      top: 255,
      position: "absolute",
    }}
  >
    {/* ... other code ... */}
  </div>
  <div
    style={{
      width: 189.56,
      height: 57.11,
      left: 1133,
      top: 1612,
      position: "absolute",
    }}
  >
    <div
      style={{
        width: 150.66,
        height: 57.11,
        left: 0,
        top: 0,
        position: "absolute",
        background: "#A3C7A0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 300,
        border: "1px black solid",
      }}
    ></div>
    <div
      style={{
        width: 139.56,
        height: 25.5,
        left: 50,
        top: 16.18,
        position: "absolute",
        color: "black",
        fontSize: 20,
        fontFamily: "Outfit",
        fontWeight: "600",
        wordWrap: "break-word",
        cursor: "pointer",
      }}
    >
      Save
    </div>
  </div>
  <div
    style={{
      width: 189.56,
      height: 57.11,
      right: 1133,
      top: 1612,
      position: "absolute",
    }}
  >
    <div
      style={{
        width: 150.66,
        height: 57.11,
        left: 0,
        top: 0,
        position: "absolute",
        background: "#A3C7A0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 300,
        border: "1px black solid",
      }}
    ></div>
    <div
      style={{
        width: 139.56,
        height: 25.5,
        left: 50,
        top: 16.18,
        position: "absolute",
        color: "black",
        fontSize: 20,
        fontFamily: "Outfit",
        fontWeight: "600",
        wordWrap: "break-word",
        cursor: "pointer",
      }}
    >
      Back
    </div>
  </div>

  <div
    style={{
      width: 150.66,
      height: 57.11,
      left: 1159,
      top: 171,
      position: "absolute",
    }}
  >
    <div
      style={{
        width: 150.66,
        height: 57.11,
        left: 0,
        top: 0,
        position: "absolute",
        background: "#A3C7A0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 300,
        border: "1px black solid",
      }}
    ></div>
    <div
      style={{
        width: 139.56,
        height: 25.5,
        left: 9,
        top: 14,
        position: "absolute",
        color: "black",
        fontSize: 20,
        fontFamily: "Outfit",
        fontWeight: "600",
        wordWrap: "break-word",
        cursor: "pointer",
      }}
    >
      Add a question
    </div>
  </div>
</div>

  );
}
export default Questions;
