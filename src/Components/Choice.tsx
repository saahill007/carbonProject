import React, { useState } from "react";
import "./Choice.css";
interface ChoiceProps {
  onValuesChange: (choice: string, value: number) => void;
}

const Choice: React.FC<ChoiceProps> = ({ onValuesChange }) => {
  const [choice, setChoice] = useState("");
  const [value, setValue] = useState<number | undefined>(undefined);

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoice(e.target.value);
    onValuesChange(e.target.value, value || 0);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue(isNaN(newValue) ? undefined : newValue);
    onValuesChange(choice, isNaN(newValue) ? 0 : newValue);
  };

  return (
    <div className="container mt-3 inputsfig">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control rounded abc"
            placeholder="Choice"
            value={choice}
            onChange={handleChoiceChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control rounded"
            placeholder="Value in number"
            value={value === undefined ? "" : value}
            onChange={handleValueChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Choice;
