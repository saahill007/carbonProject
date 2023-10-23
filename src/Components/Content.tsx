import React from "react";
import "./Content.css";

interface ContentProps {
  inputText: string;
}

const Content: React.FC<ContentProps> = ({ inputText }) => {
  // Stylized CSS

  return (
    <div
      style={{
        paddingLeft: "15%",
        paddingRight: "15%",
        textAlign: "center",
        paddingBottom: "15px",
      }}
    >
      <p className="switchText">{inputText}</p>
    </div>
  );
};

export default Content;
