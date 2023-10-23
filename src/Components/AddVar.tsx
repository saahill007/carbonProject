import React, { useState } from "react";
import axios from "axios";
// import "./style.css";

const AddVar = () => {
  const [variable, setVariable] = useState("");
  const [value, setValue] = useState("");

  const handleSave = async () => {
    // Assuming you have an API endpoint to handle the database save
    const apiEndpoint = "http://your-api-endpoint/save-data";

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(apiEndpoint, {
        variable: variable,
        value: Number(value), // Convert value to a number
      });

      // Handle the response if needed
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="box">
      <div className="group">
        <input
          type="text"
          placeholder="Variable"
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="button-selection" onClick={handleSave}>
          <div className="overlap-group">
            <div className="text-wrapper">Save</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddVar;
