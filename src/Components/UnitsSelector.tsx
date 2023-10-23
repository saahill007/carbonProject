import React, { useState } from "react";

interface UnitsSelectorProps {
  onSelectionChange: (selectedButtonIds: number[]) => void;
}

const UnitsSelector: React.FC<UnitsSelectorProps> = ({ onSelectionChange }) => {
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);

  const handleButtonClick = (index: number) => {
    const isSelected = selectedUnits.includes(index);
    const updatedSelection = isSelected
      ? selectedUnits.filter((id) => id !== index)
      : [...selectedUnits, index];
    setSelectedUnits(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  const unitLabels = [
    "Miles / week",
    "Miles / Year",
    "Gallon",
    "1000 Cubic Feet",
    "KWH",
    "Therms",
    "Dollars",
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: "10px", padding: "20px 20px" }}>
        {unitLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{
              backgroundColor: selectedUnits.includes(index)
                ? "#9FC1A2"
                : "#f27979",
              color: "white",
              padding: "15px 15px 15px 15px",
              minWidth: "150px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UnitsSelector;
