import React, { useState } from "react";

interface FormulaSelectorProps {
  labels: String[];
}

const FormulaSelector2: React.FC<FormulaSelectorProps> = ({ labels }) => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleLabelChange = (labelIndex: number, formulaName: string) => {
    setSelectedLabels((prevLabels) => {
      const updatedLabels = [...prevLabels];
      updatedLabels[labelIndex] = formulaName;
      return updatedLabels;
    });
  };

  return (
    <div>
      {labels.map((label, index) => (
        <div key={index}>
          <p>{label}</p>
          <select
            value={selectedLabels[index] || ""}
            onChange={(e) => handleLabelChange(index, e.target.value)}
          >
            <option value="">Select Formula</option>
            {/* Add your formula options dynamically here */}
            <option value="Formula1">Formula 1</option>
            <option value="Formula2">Formula 2</option>
            <option value="Formula3">Formula 3</option>
            {/* Add more formula options as needed */}
          </select>
        </div>
      ))}
      <div>
        <p>Selected Formulas:</p>
        <ul>
          {selectedLabels.map((selectedLabel, index) => (
            <li key={index}>{`${labels[index]}: ${selectedLabel}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormulaSelector2;
