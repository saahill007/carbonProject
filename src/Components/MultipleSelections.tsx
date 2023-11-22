import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrlBase } from "../config";
interface QuestionData {
  questionContent: string;
  household: boolean;
  zipcode: boolean;
  questionType: number;
  enabled: boolean;
  choiceAns: string;
  choices: string[][];
  refs: number[][];
  selectedUnits: string[]; // Update the type based on your actual data structure
  selectedFormulas: string[];
  label: string;
}

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
  ansMap: { [key: string]: string };
  questionData: QuestionData;
  id: string | undefined;
  hasMultiple: boolean;

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
  ansMap,
  questionData,
  id,
  hasMultiple,
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

  // useEffect(() => {
  //   const newUnitData: { [key: number]: DataItem[] } = {};

  //   integerArray.forEach((unitIndex) => {
  //     newUnitData[unitIndex] = unitData[unitIndex] || [];
  //   });

  //   setUnitData(newUnitData);
  //   // onDataUpdate(newUnitData);
  // }, [integerArray]);
  useEffect(() => {
    console.log("Entering useEffect");
    const newUnitData: { [key: number]: DataItem[] } = {};

    integerArray.forEach((unitIndex) => {
      newUnitData[unitIndex] = unitData[unitIndex] || [];
    });

    console.log("newUnitData:", newUnitData);
    setUnitData(newUnitData);
  }, [integerArray]);

  // const handleAddValue = (unitIndex: number) => {
  //   if (newName && newValue !== "") {
  //     setUnitData((prevData) => ({

  //       ...prevData,
  //       [unitIndex]: [

  //         { name: newName, value: Number(newValue) },
  //       ],
  //     }));

  //     setNewName("");
  //     setNewValue("");
  //   }
  // };

  const handleAddValue = (unitIndex: number) => {
    if (newName && newValue !== "") {
      setUnitData((prevData) => {
        const currentArray = Array.isArray(prevData[unitIndex])
          ? prevData[unitIndex]
          : [];

        return {
          ...prevData,
          [unitIndex]: [
            ...currentArray,
            { name: newName, value: Number(newValue) },
          ],
        };
      });

      setNewName("");
      setNewValue("");
    }
  };

  const handleDeleteValue = (unitIndex: number, dataIndex: number) => {
    setUnitData((prevData) => {
      const newData = { ...prevData };

      if (Array.isArray(newData[unitIndex])) {
        newData[unitIndex] = [
          ...newData[unitIndex].slice(0, dataIndex),
          ...newData[unitIndex].slice(dataIndex + 1),
        ];
      }

      return newData;
    });
  };
  // const [choiceAns, updateChoiceAns] = useState<string>("");
  const navigate = useNavigate();

  // const determineQuestionType = () => {
  //   if (isFib) {
  //     updateChoiceAns("1");
  //   } else if (!isFib && hasMultiple) {
  //     updateChoiceAns("3");
  //   } else {
  //     updateChoiceAns("2");
  //   }
  // };

  const saveOptionsToDatabase = async () => {
    const { choices, refs } = getChoicesAndRefs();
    const selectedValues = Object.values(
      Object.fromEntries(
        Object.entries(ansMap).filter(([key]) => selectedUnits.includes(key))
      )
    );
    const ansChoice = isFib ? "1" : hasMultiple ? "3" : "2";
    try {
      console.log(id);
      const url =
        id !== undefined && id !== null && id !== ""
          ? `${apiUrlBase}/api/updateQuestion/${id}`
          : `${apiUrlBase}/api/addQuestion`;

      const response = await fetch(url, {
        method: id !== undefined && id !== null && id !== "" ? "PATCH" : "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Remove id from the request body, as it's already in the URL
          questionContent,
          household,
          zipcode,
          questionType: questionType,
          enabled,
          choiceAns: ansChoice,
          choices: choices,
          refs: refs,
          selectedUnits,
          selectedFormulas: selectedValues,
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

  // const saveOptionsToDatabase2 = async () => {
  //   // determineQuestionType();
  //   const { choices, refs } = getChoicesAndRefs();
  //   const selectedValues = Object.values(
  //     Object.fromEntries(
  //       Object.entries(ansMap).filter(([key]) => selectedUnits.includes(key))
  //     )
  //   );
  //   try {
  //     const response = await fetch(`${apiUrlBase}/api/addQuestion`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         questionContent,
  //         household,
  //         zipcode,
  //         questionType,
  //         enabled,
  //         choiceAns: choiceAns,
  //         choices: choices, // Assuming twoArrayOption represents choices
  //         refs: refs, // Assuming twoArrayValue represents refs
  //         selectedUnits,
  //         selectedFormulas: selectedValues,
  //         label,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Error saving options to the database");
  //     }

  //     console.log("Options saved successfully!");
  //     navigate("/questions");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  useEffect(() => {
    // Set initial unitData based on questionData.choices and questionData.refs

    const initialUnitData: { [key: number]: DataItem[] } = {};
    if (questionData.questionType != 1) {
      questionData.choices.forEach((choicesRow, rowIndex) => {
        const unitIndex = integerArray[rowIndex];
        const refsRow = questionData.refs[rowIndex];

        // Create DataItem array for the unit
        const dataItems: DataItem[] = choicesRow.map((name, colIndex) => ({
          name,
          value: refsRow[colIndex],
        }));

        // Assign the dataItems to the unitIndex
        initialUnitData[unitIndex] = dataItems;
      });

      // Set the initial state
      setUnitData(initialUnitData);
    }
    // Iterate through integerArray to set initial values for each unit
  }, [integerArray, questionData.choices, questionData.refs]);

  return (
    <>
      <div>
        {/* <button onClick={() => console.log("Type of ", questionData)}>
          Click
        </button> */}
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
                <div className="Updatedtable" style={{}}>
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
                            style={{
                              width: "180px",
                              background: "white",
                              border: "3px solid black",
                            }}
                          >
                            {item.name}
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="btn btn-info"
                            style={{
                              width: "180px",
                              background: "white",
                              border: "3px solid black",
                            }}
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
                            style={{
                              width: "178px",
                              background: "black",
                              border: "None",
                            }}
                          >
                            <i className="bi bi-trash">{"    "}</i>
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
                        background: "#FF5701",
                        border: "None",
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
            background: "black",
            borderColor: "2px white",
            marginTop: "20px",
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
