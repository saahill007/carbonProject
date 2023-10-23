// RefValueSelector.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface RefValueSelectorProps {
  onSelect: (selectedValue: number) => void;
  onAdd: (name: string, value: number) => void;
}

const RefValueSelector: React.FC<RefValueSelectorProps> = ({
  onSelect,
  onAdd,
}) => {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data using Axios
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const fetchData = () => {
    axios
      .get("http://localhost:3001/api/data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    setSelectedValue(selectedValue);
    onSelect(selectedValue);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const handleAddClick = () => {
    let selectedValueToAdd: number;

    // If no value is selected, use the new value from the inputs
    if (selectedValue === null) {
      const parsedValue = parseFloat(newValue);
      if (newName && !isNaN(parsedValue)) {
        // Make a POST request to the server to add data
        axios
          .post("http://localhost:3001/api/addData", {
            name: newName,
            value: parsedValue,
          })
          .then((response) => {
            console.log(response.data.message);
            // Fetch updated data after adding
            fetchData();
          })
          .catch((error) => console.error("Error adding data:", error));

        // Clear the input fields after adding
        setNewName("");
        setNewValue("");
        selectedValueToAdd = parsedValue;
      } else {
        // Handle invalid input case
        return;
      }
    } else {
      // Handle the case where a value is selected
      selectedValueToAdd = selectedValue;
    }

    // Now, selectedValueToAdd contains the value to be added
    onAdd(newName, selectedValueToAdd);
    onSelect(selectedValueToAdd);
  };

  return (
    <div className="container mt-3">
      <label>Select or Add a Value:</label>
      <div className="input-group mb-3">
        <select className="form-control rounded" onChange={handleSelectChange}>
          <option value="">Select...</option>
          {data.map((item: any) => (
            <option key={item.id} value={item.value}>
              {item.name} - {item.value}
            </option>
          ))}
        </select>
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary rounded"
            type="button"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control rounded"
          placeholder="Name"
          value={newName}
          onChange={handleNameChange}
        />
        <div className="input-group-append">
          <span className="input-group-text" style={{ margin: "0 10px" }}>
            -
          </span>
        </div>
        <input
          type="number"
          className="form-control rounded"
          placeholder="Value"
          value={newValue}
          onChange={handleValueChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary rounded"
            type="button"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefValueSelector;
