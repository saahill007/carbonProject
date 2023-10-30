import React, { useState } from "react";

interface ChoiceProps {
  onValuesChange: (choice: string, value: number) => void;
}

const OptionValue: React.FC<ChoiceProps> = ({ onValuesChange }) => {
  const [choice, setChoice] = useState("");
  const [value, setValue] = useState<number | undefined>(undefined);
  const [errorOption, setErrorOption] = useState<string | null>(null);
  const [errorValue, setErrorValue] = useState<string | null>(null);

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChoice = e.target.value;
    setChoice(newChoice);
    validateInputs(newChoice, value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue(isNaN(newValue) ? undefined : newValue);
    validateInputs(choice, isNaN(newValue) ? 0 : newValue);
  };

  const validateInputs = (choice: string, value: number | undefined) => {
    setErrorOption(!choice.trim() ? "Option is required." : null);
    setErrorValue(value === undefined ? "Value is required." : null);
  };

  return (
    <div className="container">
      <div style={{ marginLeft: "15%", fontSize: "12px", color: "red" }}>
        {errorOption && <p>{errorOption}</p>}
        {errorValue && <p>{errorValue}</p>}
      </div>
      <div className="row" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div
          className="col-sm"
          style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "10px" }}
        >
          <input
            type="text"
            className={`form-control rounded ${
              errorOption ? "is-invalid" : ""
            }`}
            placeholder="Option..."
            value={choice}
            onChange={handleChoiceChange}
          />
        </div>

        <div
          className="col-sm"
          style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "10px" }}
        >
          <input
            type="number"
            className={`form-control rounded ${errorValue ? "is-invalid" : ""}`}
            placeholder="Value..."
            value={value === undefined ? "" : value}
            onChange={handleValueChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionValue;
