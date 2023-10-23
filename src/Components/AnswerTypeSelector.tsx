// AnswerTypeSelector.tsx
import React, { useState } from "react";
import "./AnswerTypeSelector.css"; // Import your custom CSS for styling

interface AnswerTypeSelectorProps {
  onSelect: (selectedType: number) => void;
}

const AnswerTypeSelector: React.FC<AnswerTypeSelectorProps> = ({
  onSelect,
}) => {
  const [selectedType, setSelectedType] = useState<number | null>(1);

  const handleTypeSelect = (type: number) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="custom-answer-type-selector">
      <div className="button-container">
        {/* <button
          onClick={() => handleTypeSelect(1)}
          className={`custom-btn ${selectedType === 1 ? "active" : ""}`}
        >
          Yes / No Type
        </button> */}
        <button
          onClick={() => handleTypeSelect(1)}
          className={`custom-btn ${selectedType === 1 ? "active" : ""}`}
        >
          All Types - (No Units)
        </button>
        <button
          onClick={() => handleTypeSelect(2)}
          className={`custom-btn ${selectedType === 2 ? "active" : ""}`}
        >
          All Types - (With Units)
        </button>
      </div>
    </div>
  );
};

export default AnswerTypeSelector;
