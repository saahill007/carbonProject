import React, { useState } from "react";

interface QuesProps {
  onQuestionChange: (question: string) => void;
}

const Ques: React.FC<QuesProps> = ({ onQuestionChange }) => {
  const [question, setQuestion] = useState("");

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    onQuestionChange(newQuestion);
  };

  return (
    <div>
      <div className="centered-container" style={{ width: "100%" }}>
        <div
          className="question-input-container"
          style={{ width: "80%", height: "100px" }}
        >
          <input
            type="text"
            style={{
              width: "80%",
              height: "60px",
              fontSize: "20px",
              alignContent: "center",
            }}
            placeholder="Type your question here"
            value={question}
            onChange={handleQuestionChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Ques;
