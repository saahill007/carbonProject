import React, { useState } from "react";
interface ChoiceProps {
  onValuesChange: (choice: string, value: number) => void;
}
const OptionValue: React.FC<ChoiceProps> = ({ onValuesChange }) => {
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
    <div className="container">
      <div className="row" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div
          className="col-sm"
          style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "10px" }}
        >
          <input
            type="text"
            className="form-control rounded"
            placeholder="Option..."
            onChange={handleChoiceChange}
          ></input>
        </div>
        <div
          className="col-sm"
          style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "10px" }}
        >
          <input
            type="number"
            className="form-control rounded"
            placeholder="Value..."
            onChange={handleValueChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default OptionValue;
