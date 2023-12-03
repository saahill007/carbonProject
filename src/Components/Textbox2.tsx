// TextBox.tsx
import React from "react";

interface TextBoxProps {
  content: string;
}

const TextBox2: React.FC<TextBoxProps> = ({ content }) => {
  return (
    <div
      className="text"
      style={{
        fontWeight: "bold",
        fontSize: "25px",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      {content}
    </div>
  );
};

export default TextBox2;
