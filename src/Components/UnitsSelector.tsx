// import React, { useEffect, useState } from "react";

// interface UnitsSelectorProps {
//   onSelectionChange: (selectedButtonIds: number[]) => void;
// }

// const UnitsSelector: React.FC<UnitsSelectorProps> = ({ onSelectionChange }) => {
//   const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
//   // const [unitNames, setUnitNames] = useState<string[]>([]);
//   const [unitLabels, updateUnitLabels] = useState<String[]>([]);
//   const fetchVariables = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/getUnits");
//       const data = await response.json();
//       updateUnitLabels(data);
//       // updateUnitLabels([...unitLabels, ...unitNames]);
//       console.log(unitLabels);
//     } catch (error) {
//       console.error("Error fetching unit names:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch variables from the server when the component mounts
//     fetchVariables();
//   }, []);

//   const handleButtonClick = (index: number) => {
//     const isSelected = selectedUnits.includes(index);
//     const updatedSelection = isSelected
//       ? selectedUnits.filter((id) => id !== index)
//       : [...selectedUnits, index];
//     setSelectedUnits(updatedSelection);
//     onSelectionChange(updatedSelection);
//   };
//   const buttonsPerRow = 5;

//   //   return (
//   //     <div
//   //       style={{
//   //         display: "flex",
//   //         justifyContent: "center",
//   //         marginLeft: "10%",
//   //         marginRight: "10%",
//   //       }}
//   //     >
//   //       <div style={{ display: "flex", gap: "10px", padding: "20px 20px" }}>
//   //         {unitLabels.map((label, index) => (
//   //           <button
//   //             key={index}
//   //             onClick={() => handleButtonClick(index)}
//   //             style={{
//   //               backgroundColor: selectedUnits.includes(index)
//   //                 ? "#9FC1A2"
//   //                 : "#f27979",
//   //               color: "white",
//   //               padding: "15px 15px 15px 15px",
//   //               minWidth: "150px",
//   //               border: "none",
//   //               borderRadius: "5px",
//   //               cursor: "pointer",
//   //             }}
//   //           >
//   //             {label}
//   //           </button>
//   //         ))}
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column", // Stack rows vertically
//         justifyContent: "center",
//         marginLeft: "10%",
//         marginRight: "10%",
//       }}
//     >
//       {unitLabels.map((label, rowIndex) => (
//         <div
//           key={rowIndex}
//           style={{
//             display: "flex",
//             gap: "10px",
//             padding: "20px 20px",
//             justifyContent: "center",
//           }}
//         >
//           {unitNames
//             .slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow)
//             .map((unit, colIndex) => (
//               <button
//                 key={rowIndex * buttonsPerRow + colIndex}
//                 onClick={() =>
//                   handleButtonClick(rowIndex * buttonsPerRow + colIndex)
//                 }
//                 style={{
//                   backgroundColor: selectedUnits.includes(
//                     rowIndex * buttonsPerRow + colIndex
//                   )
//                     ? "#9FC1A2"
//                     : "#f27979",
//                   color: "white",
//                   padding: "15px 15px 15px 15px",
//                   minWidth: "150px",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {unit}
//               </button>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UnitsSelector;

import React, { useEffect, useState } from "react";
import { apiUrlBase } from "../config";

interface UnitsSelectorProps {
  onSelectionChange: (selectedButtonIds: number[]) => void;
  onSelectionChangeString: (selectedButtonIds: String[]) => void;
  key: string; // Add key prop
}

const UnitsSelector: React.FC<UnitsSelectorProps> = ({
  onSelectionChange,
  onSelectionChangeString,
}) => {
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [unitLabels, updateUnitLabels] = useState<String[]>([]);
  const [selectedUnitLabels, updateSelectedUnitLabels] = useState<String[]>([]);
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

  const handleButtonClick = (index: number, label: String) => {
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
                {unit}
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default UnitsSelector;
