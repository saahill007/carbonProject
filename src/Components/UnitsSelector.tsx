import React, { useEffect, useState } from "react";
import { apiUrlBase } from "../config";

interface UnitsSelectorProps {
  onSelectionChange: (selectedButtonIds: number[]) => void;
  onSelectionChangeString: (selectedButtonIds: string[]) => void;
  selectedUnitsInitial: number[];
  selectedUnitLabelsInitial: string[];
  key: string;
}

const UnitsSelector: React.FC<UnitsSelectorProps> = ({
  onSelectionChange,
  onSelectionChangeString,
  selectedUnitsInitial,
  selectedUnitLabelsInitial,
}) => {
  const [selectedUnits, setSelectedUnits] =
    useState<number[]>(selectedUnitsInitial);
  const [unitLabels, updateUnitLabels] = useState<string[]>([]);
  const [selectedUnitLabels, updateSelectedUnitLabels] = useState<string[]>(
    selectedUnitLabelsInitial
  );

  const fetchVariables = async () => {
    try {
      const response = await fetch(`${apiUrlBase}/api/getUnits`);
      const data = await response.json();
      updateUnitLabels(data);
    } catch (error) {
      console.error("Error fetching unit names:", error);
    }
  };

  useEffect(() => {
    // Fetch variables from the server when the component mounts
    fetchVariables();
  }, []);

  useEffect(() => {
    // Update state when selectedUnitsInitial changes
    setSelectedUnits(selectedUnitsInitial);
  }, [selectedUnitsInitial]);

  useEffect(() => {
    // Update state when selectedUnitLabelsInitial changes
    updateSelectedUnitLabels(selectedUnitLabelsInitial);
  }, [selectedUnitLabelsInitial]);

  const handleButtonClick = (index: number, label: string) => {
    const isSelected = selectedUnits.includes(index);
    const updatedSelection = isSelected
      ? selectedUnits.filter((id) => id !== index)
      : [...selectedUnits, index];
    setSelectedUnits(updatedSelection);
    onSelectionChange(updatedSelection);

    const isSelectedString = selectedUnitLabels.includes(label);
    const updatedSelectionString = isSelectedString
      ? selectedUnitLabels.filter((id) => id !== label)
      : [...selectedUnitLabels, label];
    updateSelectedUnitLabels(updatedSelectionString);
    onSelectionChangeString(updatedSelectionString);
  };

  const buttonsPerRow = 5;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack rows vertically
        justifyContent: "center",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      {unitLabels.map((label, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "flex",
            gap: "10px",
            paddingBottom: "3px", // Add padding at the bottom of each row
            justifyContent: "center",
          }}
        >
          {unitLabels
            .slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow)
            .map((unit, colIndex) => (
              <button
                key={rowIndex * buttonsPerRow + colIndex}
                onClick={() =>
                  handleButtonClick(rowIndex * buttonsPerRow + colIndex, label)
                }
                style={{
                  backgroundColor: selectedUnits.includes(
                    rowIndex * buttonsPerRow + colIndex
                  )
                    ? "#ff5701"
                    : "black",
                  color: "white",
                  padding: "15px 15px 15px 15px",
                  minWidth: "150px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {unit}
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default UnitsSelector;
