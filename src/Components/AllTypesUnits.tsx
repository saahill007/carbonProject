import React, { useEffect, useState } from "react";
import NewFormula from "./NewFormula";
import UnitsSelector from "./UnitsSelector";
import OptionValue from "./OptionValue";
import SwitchContent from "./SwitchContent";
import { useNavigate } from "react-router-dom";
// interface Formula {
//   id: number;
//   formulaName: string;
// }

interface AllTypesUnitsProps {
  onArraysChange: (option: string[][], value: number[][]) => void;
  questionContent: string;
  household: boolean;
  zipcode: boolean;
  questionType: number;
  enabled: boolean;
  label: string;
}
const AllTypesUnits: React.FC<AllTypesUnitsProps> = ({
  onArraysChange,
  questionContent,
  household,
  zipcode,
  questionType,
  enabled,
  label,
}) => {
  const [twoArrayOption, setTwoArrayOption] = useState<string[][]>([]);
  const [twoArrayValue, setTwoArrayValue] = useState<number[][]>([]);
  const [isFib, updateFib] = useState(true);
  const [hasMultiple, updateHasMultiple] = useState(false);
  const [unit1Formula, updateUnit1Formula] = useState<string>("");
  const [unit2Formula, updateUnit2Formula] = useState<string>("");
  const [unit3Formula, updateUnit3Formula] = useState<string>("");
  const [unit4Formula, updateUnit4Formula] = useState<string>("");
  const [unit5Formula, updateUnit5Formula] = useState<string>("");
  const [unit6Formula, updateUnit6Formula] = useState<string>("");
  const [unit7Formula, updateUnit7Formula] = useState<string>("");
  const [choiceAns, updateChoiceAns] = useState("1");
  const [selectedFormulas, updateSelectedFormulas] = useState([]);

  const getUpdatedChoice = () => {
    if (isFib) {
      updateChoiceAns("1");
    }
    if (!isFib) {
      if (hasMultiple) {
        updateChoiceAns("3");
      } else {
        updateChoiceAns("2");
      }
    }
    console.log("updated choice");
  };

  // const [allformulas,updateFormulas] = useState<String>([]);
  // Function to initialize arrays
  const initializeArrays = () => {
    const numRows: number = 7;
    const numCols: number = 8;

    // Initialize the 2D array with empty strings
    const optionArray: string[][] = [];
    for (let i = 0; i < numRows; i++) {
      let row: string[] = [];
      for (let j = 0; j < numCols; j++) {
        row.push("");
      }
      optionArray.push(row);
    }

    // Initialize the 2D array with number 1
    const valueArray: number[][] = [];
    for (let i = 0; i < numRows; i++) {
      let row: number[] = [];
      for (let j = 0; j < numCols; j++) {
        row.push(1);
      }
      valueArray.push(row);
    }

    // Set state variables
    setTwoArrayOption(optionArray);
    setTwoArrayValue(valueArray);
    onArraysChange(optionArray, valueArray);
  };

  // Call the initializeArrays function when the component mounts
  React.useEffect(() => {
    initializeArrays();
  }, []);

  useEffect(() => {
    onArraysChange(twoArrayOption, twoArrayValue);
  }, [twoArrayOption, twoArrayValue]);
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [unitRefs, updateUnitRefs] = useState<string[]>([
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
  ]);

  const [optionCount, updateOptionCount] = useState<number>(4);

  const [formulas, setFormulas] = useState<String[]>([]);
  const [isAddNewActive, updateAddNew] = useState(false);
  const toggleAddNew = () => {
    updateAddNew(!isAddNewActive);
    console.log(unit1Formula);
  };
  const handleSelectionChange = (selectedButtonIds: number[]) => {
    setSelectedUnits(selectedButtonIds);
    // Do whatever you need to do with the selected units in the parent component
    console.log("Selected Units in Parent:", selectedButtonIds);
  };
  const handleRadioChange = (value: boolean) => {
    updateFib(value);
    console.log(hasMultiple);
    handleRadioChange;
  };
  const handleSwitchChange = (value: boolean) => {
    updateHasMultiple(value);
    updateChoiceAns;
    // You can perform additional actions if needed
  };

  // Function to fetch formulas
  // Function to fetch formulas
  const fetchFormulas = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/allformulas");
      const data = await response.json();
      console.log("Formula response:", data);
      setFormulas(data);
    } catch (error) {
      console.error("Error fetching formulas:", error);
    }
  };

  // Function to handle unit selection change
  const handleSelection1Change = (selectedButtonIds: number[]) => {
    setSelectedUnits(selectedButtonIds);
  };

  // Use useEffect to fetch formulas when component mounts or when selected units change
  useEffect(() => {
    fetchFormulas();
  }, [selectedUnits]);

  const radioContainerStyle = {
    display: "inline-flex",
    alignItems: "center",
    marginRight: "20px",
  };

  const radioStyle = {
    marginRight: "5px",
    cursor: "pointer",
  };
  const navigate = useNavigate();
  const saveOptionsToDatabase = async () => {
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
          choices: twoArrayOption, // Assuming twoArrayOption represents choices
          refs: twoArrayValue, // Assuming twoArrayValue represents refs
          selectedUnits,
          selectedFormulas,
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
    <div>
      <div
        className="row"
        style={{
          fontFamily: "Outfit-SemiBold, Helvetica",
          fontSize: "16px",
          fontWeight: "bold",

          marginLeft: "30%",
          marginRight: "30%",
        }}
      >
        <div className="col-sm-2">
          <input
            type="radio"
            name="radioGrp"
            style={{ width: "30px", height: "30px" }}
            onChange={() => {
              handleRadioChange(true);
              updateChoiceAns;
            }}
            defaultChecked
          />
        </div>
        <div className="col-lg">Fill In the Blank</div>
        <div className="col-sm-2">
          <input
            type="radio"
            name="radioGrp"
            style={{ width: "30px", height: "30px" }}
            onChange={() => {
              handleRadioChange(false);
              updateChoiceAns;
            }}
          />
        </div>
        <div className="col-lg">Single / Multiple Selection</div>
      </div>
      {!isFib && (
        <div
          className="container"
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            textAlign: "center",
            width: "35%",
          }}
        >
          <SwitchContent label="Allow Multiple" onChange={handleSwitchChange} />
        </div>
      )}
      <p
        style={{
          fontFamily: "Outfit-SemiBold, Helvetica",
          fontSize: "20px",
          fontWeight: "bold",

          marginLeft: "20px",
        }}
      >
        Select Units
      </p>
      <UnitsSelector onSelectionChange={handleSelectionChange} />
      {selectedUnits.includes(0) && (
        <>
          <div
            className="formula"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row d-flex align-items-center">
              <div className="col text-center">Miles / Week</div>

              <div className="col text-center">
                <select
                  className="form-select"
                  value={unit1Formula || ""}
                  onChange={(e) => updateUnit1Formula(e.target.value)}
                  style={{ width: "200px" }}
                  onClick={() => {
                    fetchFormulas();
                  }}
                >
                  <option value="" disabled>
                    Select Formula
                  </option>
                  {formulas.map((f, index) => (
                    <option key={index}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      {selectedUnits.includes(1) && (
        <>
          <div
            className="formula"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row d-flex align-items-center">
              <div className="col text-center">Miles / Year</div>

              <div className="col text-center">
                <select
                  className="form-select"
                  value={unit2Formula || ""}
                  onChange={(e) => updateUnit2Formula(e.target.value)}
                  style={{ width: "200px" }}
                  onClick={() => {
                    fetchFormulas();
                  }}
                >
                  <option value="" disabled>
                    Select Formula
                  </option>
                  {formulas.map((f, index) => (
                    <option key={index}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      {selectedUnits.includes(2) && (
        <>
          <div
            className="formula"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row d-flex align-items-center">
              <div className="col text-center">Gallon</div>

              <div className="col text-center">
                <select
                  className="form-select"
                  value={unit3Formula || ""}
                  onChange={(e) => updateUnit3Formula(e.target.value)}
                  style={{ width: "200px" }}
                  onClick={() => {
                    fetchFormulas();
                  }}
                >
                  <option value="" disabled>
                    Select Formula
                  </option>
                  {formulas.map((f, index) => (
                    <option key={index}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      {selectedUnits.includes(3) && (
        <>
          <div
            className="formula"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row d-flex align-items-center">
              <div className="col text-center">1000 Cubic Feet</div>

              <div className="col text-center">
                <select
                  className="form-select"
                  value={unit4Formula || ""}
                  onChange={(e) => updateUnit4Formula(e.target.value)}
                  style={{ width: "200px" }}
                  onClick={() => {
                    fetchFormulas();
                  }}
                >
                  <option value="" disabled>
                    Select Formula
                  </option>
                  {formulas.map((f, index) => (
                    <option key={index}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      {selectedUnits.includes(4) && (
        <>
          <div
            className="formula"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row d-flex align-items-center">
              <div className="col text-center">KWH</div>

              <div className="col text-center">
                <select
                  className="form-select"
                  value={unit5Formula || ""}
                  onChange={(e) => updateUnit5Formula(e.target.value)}
                  style={{ width: "200px" }}
                  onClick={() => {
                    fetchFormulas();
                  }}
                >
                  <option value="" disabled>
                    Select Formula
                  </option>
                  {formulas.map((f, index) => (
                    <option key={index}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      {selectedUnits.includes(5) && (
        <>
          <div
            className="formula"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row d-flex align-items-center">
              <div className="col text-center">Therms</div>

              <div className="col text-center">
                <select
                  className="form-select"
                  value={unit6Formula || ""}
                  onChange={(e) => updateUnit6Formula(e.target.value)}
                  style={{ width: "200px" }}
                  onClick={() => {
                    fetchFormulas();
                  }}
                >
                  <option value="" disabled>
                    Select Formula
                  </option>
                  {formulas.map((f, index) => (
                    <option key={index}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      {selectedUnits.includes(6) && (
        <>
          <div
            className="formula"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <div className="row d-flex align-items-center">
              <div className="col text-center">Dollars</div>

              <div className="col text-center">
                <select
                  className="form-select"
                  value={unit7Formula || ""}
                  onChange={(e) => updateUnit7Formula(e.target.value)}
                  style={{ width: "200px" }}
                  onClick={() => {
                    fetchFormulas();
                  }}
                >
                  <option value="" disabled>
                    Select Formula
                  </option>
                  {formulas.map((f, index) => (
                    <option key={index}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="row d-flex align-items-center">
        <div className="col-md text-center">
          <button
            className="btn btn-primary"
            style={{
              width: "400px",
              marginTop: "30px",
              marginBottom: "30px",
              backgroundColor: "#84D2F3",
              border: "#84D2F3",
            }}
            onClick={toggleAddNew}
          >
            Add New Formula
          </button>
        </div>
      </div>
      {isAddNewActive && <NewFormula />}
      {!isFib && (
        <>
          {selectedUnits.includes(0) && (
            <div>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginLeft: "10%",
                }}
              >
                Select Options for Miles / Week
              </p>
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                  marginLeft: "10%",

                  marginRight: "10%",
                }}
              >
                {1 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][0] = choice;
                      twoArrayValue[0][0] = value;
                    }}
                  />
                )}
                {2 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][1] = choice;
                      twoArrayValue[0][1] = value;
                    }}
                  />
                )}
                {3 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][2] = choice;
                      twoArrayValue[0][2] = value;
                    }}
                  />
                )}
                {4 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][3] = choice;
                      twoArrayValue[0][3] = value;
                    }}
                  />
                )}
                {5 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][4] = choice;
                      twoArrayValue[0][4] = value;
                    }}
                  />
                )}
                {6 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][5] = choice;
                      twoArrayValue[0][5] = value;
                    }}
                  />
                )}
                {7 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][6] = choice;
                      twoArrayValue[0][6] = value;
                    }}
                  />
                )}
                {8 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[0][7] = choice;
                      twoArrayValue[0][7] = value;
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {selectedUnits.includes(1) && (
            <div>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginLeft: "10%",
                }}
              >
                Select Options for Miles / Year
              </p>
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                {1 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][0] = choice;
                      twoArrayValue[1][0] = value;
                    }}
                  />
                )}
                {2 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][1] = choice;
                      twoArrayValue[1][1] = value;
                    }}
                  />
                )}
                {3 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][2] = choice;
                      twoArrayValue[1][2] = value;
                    }}
                  />
                )}
                {4 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][3] = choice;
                      twoArrayValue[1][3] = value;
                    }}
                  />
                )}
                {5 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][4] = choice;
                      twoArrayValue[1][4] = value;
                    }}
                  />
                )}
                {6 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][5] = choice;
                      twoArrayValue[1][5] = value;
                    }}
                  />
                )}
                {7 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][6] = choice;
                      twoArrayValue[1][6] = value;
                    }}
                  />
                )}
                {8 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[1][7] = choice;
                      twoArrayValue[1][7] = value;
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {selectedUnits.includes(2) && (
            <div>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginLeft: "10%",
                }}
              >
                Select Options for Gallon
              </p>
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                {1 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][0] = choice;
                      twoArrayValue[2][0] = value;
                    }}
                  />
                )}
                {2 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][1] = choice;
                      twoArrayValue[2][1] = value;
                    }}
                  />
                )}
                {3 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][2] = choice;
                      twoArrayValue[2][2] = value;
                    }}
                  />
                )}
                {4 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][3] = choice;
                      twoArrayValue[2][3] = value;
                    }}
                  />
                )}
                {5 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][4] = choice;
                      twoArrayValue[2][4] = value;
                    }}
                  />
                )}
                {6 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][5] = choice;
                      twoArrayValue[2][5] = value;
                    }}
                  />
                )}
                {7 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][6] = choice;
                      twoArrayValue[2][6] = value;
                    }}
                  />
                )}
                {8 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[2][7] = choice;
                      twoArrayValue[2][7] = value;
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {selectedUnits.includes(3) && (
            <div>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginLeft: "10%",
                }}
              >
                Select Options for 1000 Cubic Ft
              </p>
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                {1 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][0] = choice;
                      twoArrayValue[3][0] = value;
                    }}
                  />
                )}
                {2 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][1] = choice;
                      twoArrayValue[3][1] = value;
                    }}
                  />
                )}
                {3 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][2] = choice;
                      twoArrayValue[3][2] = value;
                    }}
                  />
                )}
                {4 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][3] = choice;
                      twoArrayValue[3][3] = value;
                    }}
                  />
                )}
                {5 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][4] = choice;
                      twoArrayValue[3][4] = value;
                    }}
                  />
                )}
                {6 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][5] = choice;
                      twoArrayValue[3][5] = value;
                    }}
                  />
                )}
                {7 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][6] = choice;
                      twoArrayValue[3][6] = value;
                    }}
                  />
                )}
                {8 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[3][7] = choice;
                      twoArrayValue[3][7] = value;
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {selectedUnits.includes(4) && (
            <div>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginLeft: "10%",
                }}
              >
                Select Options for KWH
              </p>
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                {1 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][0] = choice;
                      twoArrayValue[4][0] = value;
                    }}
                  />
                )}
                {2 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][1] = choice;
                      twoArrayValue[4][1] = value;
                    }}
                  />
                )}
                {3 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][2] = choice;
                      twoArrayValue[4][2] = value;
                    }}
                  />
                )}
                {4 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][3] = choice;
                      twoArrayValue[4][3] = value;
                    }}
                  />
                )}
                {5 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][4] = choice;
                      twoArrayValue[4][4] = value;
                    }}
                  />
                )}
                {6 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][5] = choice;
                      twoArrayValue[4][5] = value;
                    }}
                  />
                )}
                {7 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][6] = choice;
                      twoArrayValue[4][6] = value;
                    }}
                  />
                )}
                {8 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[4][7] = choice;
                      twoArrayValue[4][7] = value;
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {selectedUnits.includes(5) && (
            <div>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginLeft: "10%",
                }}
              >
                Select Options for Therms
              </p>
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                {1 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][0] = choice;
                      twoArrayValue[5][0] = value;
                    }}
                  />
                )}
                {2 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][1] = choice;
                      twoArrayValue[5][1] = value;
                    }}
                  />
                )}
                {3 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][2] = choice;
                      twoArrayValue[5][2] = value;
                    }}
                  />
                )}
                {4 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][3] = choice;
                      twoArrayValue[5][3] = value;
                    }}
                  />
                )}
                {5 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][4] = choice;
                      twoArrayValue[5][4] = value;
                    }}
                  />
                )}
                {6 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][5] = choice;
                      twoArrayValue[5][5] = value;
                    }}
                  />
                )}
                {7 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][6] = choice;
                      twoArrayValue[5][6] = value;
                    }}
                  />
                )}
                {8 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[5][7] = choice;
                      twoArrayValue[5][7] = value;
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {selectedUnits.includes(6) && (
            <div>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "30px",
                  marginLeft: "10%",
                }}
              >
                Select Options for Dollars
              </p>
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                {1 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][0] = choice;
                      twoArrayValue[6][0] = value;
                    }}
                  />
                )}
                {2 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][1] = choice;
                      twoArrayValue[6][1] = value;
                    }}
                  />
                )}
                {3 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][2] = choice;
                      twoArrayValue[6][2] = value;
                    }}
                  />
                )}
                {4 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][3] = choice;
                      twoArrayValue[6][3] = value;
                      //               const newOptions = [...twoArrayOption];
                      // newOptions[6] = [...newOptions[6]];
                      // newOptions[6][3] = choice;
                      // const newValues = [...twoArrayV];
                      // newValues[0] = [...newValues[0]];
                      // newValues[0][index] = value;
                    }}
                  />
                )}
                {5 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][4] = choice;
                      twoArrayValue[6][4] = value;
                    }}
                  />
                )}
                {6 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][5] = choice;
                      twoArrayValue[6][5] = value;
                    }}
                  />
                )}
                {7 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][6] = choice;
                      twoArrayValue[6][6] = value;
                    }}
                  />
                )}
                {8 <= optionCount && (
                  <OptionValue
                    onValuesChange={(choice: string, value: number) => {
                      twoArrayOption[6][7] = choice;
                      twoArrayValue[6][7] = value;
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}

      {!isFib && (
        <div
          className="row"
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <div className="col">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#84D2F3", border: "0px" }}
              onClick={() => {
                if (optionCount == 8) {
                } else {
                  updateOptionCount(optionCount + 1);
                }

                console.log(twoArrayOption);
              }}
            >
              Add New Option
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#e38181", border: "0px" }}
              onClick={() => {
                if (optionCount == 0) {
                  updateOptionCount(0);
                } else {
                  updateOptionCount(optionCount - 1);
                }
                console.log(optionCount);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div
        className="row"
        style={{ marginLeft: "10%", marginRight: "10%", marginBottom: "30px" }}
      >
        <div className="col">
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#A7C8A3", border: "0px" }}
          >
            Back
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#A7C8A3", border: "0px" }}
            onClick={saveOptionsToDatabase}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTypesUnits;
