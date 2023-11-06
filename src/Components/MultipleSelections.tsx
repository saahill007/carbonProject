// import React, { useState, useEffect } from "react";

// interface MultipleSelectionsProps {
//   stringArray: String[];
//   integerArray: number[];
//   //   onDataUpdate: (unitData: { [key: number]: DataItem[] }) => void;
// }

// interface DataItem {
//   name: string;
//   value: number;
// }

// const MultipleSelections: React.FC<MultipleSelectionsProps> = ({
//   stringArray,
//   integerArray,
//   //   onDataUpdate,
// }) => {
//   const [unitData, setUnitData] = useState<{ [key: number]: DataItem[] }>({});
//   const [newName, setNewName] = useState<string>("");
//   const [newValue, setNewValue] = useState<number | string>("");
//   const getChoicesAndRefs = () => {
//     const choices: string[][] = [];
//     const refs: (number | string)[][] = [];

//     integerArray.forEach((unitIndex) => {
//       const choicesRow = unitData[unitIndex].map((item) => item.name);
//       const refsRow = unitData[unitIndex].map((item) => item.value);

//       choices.push(choicesRow);
//       refs.push(refsRow);
//     });

//     return { choices, refs };
//   };
//   useEffect(() => {
//     const newUnitData: { [key: number]: DataItem[] } = {};

//     integerArray.forEach((unitIndex) => {
//       newUnitData[unitIndex] = unitData[unitIndex] || [];
//     });

//     setUnitData(newUnitData);
//     // onDataUpdate(newUnitData);
//   }, [integerArray]);

//   const handleAddValue = (unitIndex: number) => {
//     if (newName && newValue !== "") {
//       setUnitData((prevData) => ({
//         ...prevData,
//         [unitIndex]: [
//           ...prevData[unitIndex],
//           { name: newName, value: Number(newValue) },
//         ],
//       }));

//       setNewName("");
//       setNewValue("");
//     }
//   };

//   const handleDeleteValue = (unitIndex: number, dataIndex: number) => {
//     setUnitData((prevData) => ({
//       ...prevData,
//       [unitIndex]: [
//         ...prevData[unitIndex].slice(0, dataIndex),
//         ...prevData[unitIndex].slice(dataIndex + 1),
//       ],
//     }));
//   };

//   return (
//     <>
//       <div>
//         {integerArray.map((selectedIndex: number) => (
//           <div
//             key={selectedIndex}
//             style={{
//               marginBottom: "20px",
//               background: "#F5F5F5",
//               marginTop: "20px",
//               paddingLeft: "20px",
//               paddingRight: "20px",
//               paddingTop: "20px",
//               borderRadius: "10px",
//               fontSize: "18px",
//             }}
//           >
//             <p>{stringArray[selectedIndex]}</p>
//             <div style={{}}>
//               <div
//                 className="Updatedtable"
//                 style={
//                   {
//                     /* ... */
//                   }
//                 }
//               >
//                 <div
//                   className="row align-items-center justify-content-center"
//                   style={{ fontSize: "16px" }}
//                 >
//                   <div className="col">Option</div>
//                   <div className="col">Value</div>
//                   <div className="col">Action</div>
//                 </div>
//                 {Array.isArray(unitData[selectedIndex]) &&
//                   unitData[selectedIndex].map((item, index) => (
//                     <div
//                       className="row align-items-center justify-content-center"
//                       key={index}
//                     >
//                       <div className="col" style={{}}>
//                         <button
//                           className="btn btn-info"
//                           style={{ width: "180px" }}
//                         >
//                           {item.name}
//                         </button>
//                       </div>
//                       <div className="col">
//                         <button
//                           className="btn btn-info"
//                           style={{ width: "180px" }}
//                         >
//                           {item.value}
//                         </button>
//                       </div>
//                       <div className="col">
//                         <button
//                           className="btn btn-danger btn-sm"
//                           onClick={() =>
//                             handleDeleteValue(selectedIndex, index)
//                           }
//                           style={{ width: "150px" }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//               <div className="row">
//                 <div className="col">
//                   <input
//                     type="text"
//                     className="form-control rounded"
//                     id="newName"
//                     placeholder="Option..."
//                     // value={newName}
//                     onChange={(e) => setNewName(e.target.value)}
//                   />
//                 </div>
//                 <div className="col">
//                   <input
//                     type="number"
//                     className="form-control rounded"
//                     id="newValue"
//                     placeholder="Value..."
//                     // value={newValue}
//                     onChange={(e) => setNewValue(e.target.value)}
//                   />
//                 </div>
//                 <div className="col">
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleAddValue(selectedIndex)}
//                     style={{
//                       width: "180px",
//                       marginBottom: "25px",
//                       background: "#84D2F2",
//                       borderColor: "#84D2F2",
//                     }}
//                   >
//                     Add Option
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div style={{ margin: "0 auto", textAlign: "center" }}>
//         <button
//           className="btn btn-success"
//           style={{
//             width: "300px",
//             background: "#A7C8A3",
//             borderColor: "#A7C8A3",
//           }}
//           onClick={() => console.log(unitData)}
//         >
//           Save
//         </button>
//       </div>
//     </>
//   );
// };

// export default MultipleSelections;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface MultipleSelectionsProps {
  stringArray: String[];
  isFib: boolean;
  integerArray: number[];
  questionContent: string;
  household: boolean;
  zipcode: boolean;
  questionType: number;
  enabled: boolean;
  label: string;
  selectedUnits: String[];
  choiceAns: string;

  //   onDataUpdate: (unitData: { [key: number]: DataItem[] }) => void;
}

interface DataItem {
  name: string;
  value: number;
}

const MultipleSelections: React.FC<MultipleSelectionsProps> = ({
  stringArray,
  isFib,
  integerArray,
  questionContent,
  household,
  zipcode,
  questionType,
  enabled,
  label,
  choiceAns,
  selectedUnits,
  //   onDataUpdate,
}) => {
  const [unitData, setUnitData] = useState<{ [key: number]: DataItem[] }>({});
  const [newName, setNewName] = useState<string>("");
  const [newValue, setNewValue] = useState<number | string>("");
  const getChoicesAndRefs = () => {
    const choices: string[][] = [];
    const refs: (number | string)[][] = [];

    integerArray.forEach((unitIndex) => {
      const choicesRow = unitData[unitIndex]?.map((item) => item.name) || [];
      const refsRow = unitData[unitIndex]?.map((item) => item.value) || [];

      choices.push(choicesRow);
      refs.push(refsRow);
    });

    return { choices, refs };
  };

  useEffect(() => {
    const newUnitData: { [key: number]: DataItem[] } = {};

    integerArray.forEach((unitIndex) => {
      newUnitData[unitIndex] = unitData[unitIndex] || [];
    });

    setUnitData(newUnitData);
    // onDataUpdate(newUnitData);
  }, [integerArray]);

  const handleAddValue = (unitIndex: number) => {
    if (newName && newValue !== "") {
      setUnitData((prevData) => ({
        ...prevData,
        [unitIndex]: [
          ...prevData[unitIndex],
          { name: newName, value: Number(newValue) },
        ],
      }));

      setNewName("");
      setNewValue("");
    }
  };

  const handleDeleteValue = (unitIndex: number, dataIndex: number) => {
    setUnitData((prevData) => ({
      ...prevData,
      [unitIndex]: [
        ...prevData[unitIndex].slice(0, dataIndex),
        ...prevData[unitIndex].slice(dataIndex + 1),
      ],
    }));
  };
  const navigate = useNavigate();
  const saveOptionsToDatabase = async () => {
    const { choices, refs } = getChoicesAndRefs();
    try {
      const response = await fetch("http://localhost:3001/api/addQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionContent,
          household,
          zipcode,
          questionType,
          enabled,
          choiceAns,
          choices: choices, // Assuming twoArrayOption represents choices
          refs: refs, // Assuming twoArrayValue represents refs
          selectedUnits,
          selectedFormulas: [],
          label,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving options to the database");
      }

      console.log("Options saved successfully!");
      navigate("/questions");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div>
        {!isFib &&
          integerArray.map((selectedIndex: number) => (
            <div
              key={selectedIndex}
              style={{
                marginBottom: "20px",
                background: "#F5F5F5",
                marginTop: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "20px",
                borderRadius: "10px",
                fontSize: "18px",
              }}
            >
              <p>{stringArray[selectedIndex]}</p>
              <div style={{}}>
                <div
                  className="Updatedtable"
                  style={
                    {
                      /* ... */
                    }
                  }
                >
                  <div
                    className="row align-items-center justify-content-center"
                    style={{ fontSize: "16px" }}
                  >
                    <div className="col">Option</div>
                    <div className="col">Value</div>
                    <div className="col">Action</div>
                  </div>
                  {Array.isArray(unitData[selectedIndex]) &&
                    unitData[selectedIndex].map((item, index) => (
                      <div
                        className="row align-items-center justify-content-center"
                        key={index}
                      >
                        <div className="col" style={{}}>
                          <button
                            className="btn btn-info"
                            style={{ width: "180px" }}
                          >
                            {item.name}
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="btn btn-info"
                            style={{ width: "180px" }}
                          >
                            {item.value}
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeleteValue(selectedIndex, index)
                            }
                            style={{ width: "150px" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control rounded"
                      id="newName"
                      placeholder="Option..."
                      // value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control rounded"
                      id="newValue"
                      placeholder="Value..."
                      // value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleAddValue(selectedIndex);
                        const { choices, refs } = getChoicesAndRefs();
                        console.log({ choices, refs });
                      }}
                      style={{
                        width: "180px",
                        marginBottom: "25px",
                        background: "#84D2F2",
                        borderColor: "#84D2F2",
                      }}
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <button
          className="btn btn-success"
          style={{
            width: "100%",
            background: "#A7C8A3",
            borderColor: "#A7C8A3",
          }}
          onClick={() => {
            const { choices, refs } = getChoicesAndRefs();
            console.log({ choices, refs });
            saveOptionsToDatabase();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default MultipleSelections;
