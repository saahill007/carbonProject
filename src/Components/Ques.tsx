// import React, { useState } from "react";

// interface QuesProps {
//   onQuestionChange: (question: string) => void;
// }

// const Ques: React.FC<QuesProps> = ({ onQuestionChange }) => {
//   const [question, setQuestion] = useState("");

//   const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newQuestion = e.target.value;
//     setQuestion(newQuestion);
//     onQuestionChange(newQuestion);
//   };

//   return (
//     <div>
//       <div className="centered-container" style={{ width: "100%" }}>
//         <div
//           className="question-input-container"
//           style={{ width: "80%", height: "100px" }}
//         >
//           <input
//             type="text"
//             style={{
//               width: "80%",
//               height: "60px",
//               fontSize: "20px",
//               alignContent: "center",
//             }}
//             placeholder="Type your question here"
//             value={question}
//             onChange={handleQuestionChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Ques;
// Ques.tsx
import React, { useState } from "react";

interface QuesProps {
  onQuestionChange: (question: string) => void;
  defaultQuestion?: string;
}

const Ques: React.FC<QuesProps> = ({
  onQuestionChange,
  defaultQuestion = "",
}) => {
  const [question, setQuestion] = useState(defaultQuestion);
  const [error, setError] = useState<string | null>(null);
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    onQuestionChange(newQuestion);
    setError(newQuestion.trim() === "" ? "Question cannot be empty" : null);
  };

  return (
    <div>
      <div className="centered-container" style={{ width: "100%" }}>
        {/* <p>{defaultQuestion}</p> */}
        <div
          className="question-input-container"
          style={{
            width: "80%",
            height: "100px",
            background: "#FF5701",
          }}
        >
          <input
            type="text"
            style={{
              width: "80%",
              height: "60px",
              fontSize: "20px",
              alignContent: "center",
              outline: "none",
              borderBottom: "2px solid #FF5701",
            }}
            placeholder="Type your question here"
            value={defaultQuestion}
            onChange={handleQuestionChange}
          />
        </div>
        {error && (
          <p style={{ color: "#FF5701", fontWeight: "bold" }}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default Ques;
