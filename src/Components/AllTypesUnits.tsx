import React, { useEffect, useState } from "react";
import NewFormula from "./NewFormula";
import UnitsSelector from "./UnitsSelector";
// import OptionValue from "./OptionValue";
import SwitchContent from "./SwitchContent";
import { useNavigate } from "react-router-dom";
import MultipleSelections from "./MultipleSelections";
import { apiUrlBase } from "../config";
// import FormulaSelector2 from "../FormulaSelector2";

// interface Formula {
//   id: number;
//   formulaName: string;
// }
interface DataItem {
  name: string;
  value: number;
}
interface AllTypesUnitsProps {
  onArraysChange: (option: string[][], value: number[][]) => void;
  questionContent: string;
  household: boolean;
  zipcode: boolean;
  questionType: number;
  enabled: boolean;
  label: string;
}

interface FormulaSelectorProps {
  unitIndex: number;
  unitLabel: String;
  selectedFormula: string;
  onFormulaChange: (unitIndex: number, formula: string) => void;
  formulas: String[]; // Corrected the type here
}

const FormulaSelector: React.FC<FormulaSelectorProps> = ({
  unitIndex,
  unitLabel,
  // selectedFormula,
  onFormulaChange,
  formulas,
}) => {
  const [selectedForm, updateSelectedForm] = useState("");
  return (
    <div className="formula" style={{ marginLeft: "20%", marginRight: "20%" }}>
      <div className="row d-flex align-items-center">
        <div className="col text-center">{unitLabel}</div>
        <div className="col text-center">
          <select
            className="form-select"
            value={selectedForm || ""}
            onChange={(e) => {
              onFormulaChange(unitIndex, e.target.value);
              updateSelectedForm(e.target.value);
            }}
            style={{ width: "200px" }}
            onClick={() => {
              // fetchFormulas(); // You may want to fetch formulas here
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
  );
};
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

  const [selectedUnitsData, setSelectedUnitsData] = useState<{
    [key: number]: DataItem[];
  }>({});

  const handleDataUpdate = (unitData: { [key: number]: DataItem[] }) => {
    // Update the state in the parent component with the received unitData
    setSelectedUnitsData(unitData);

    // Print the unitData (you can replace this with your desired logic)
    console.log("Updated unitData in parent component:", unitData);
  };
  const [choiceAns, updateChoiceAns] = useState("1");
  // const [selectedFormulas, updateSelectedFormulas] = useState([]);
  const [newVar, updateVar] = useState<string>("");
  const [unitsSelectorKey, setUnitsSelectorKey] = useState<string>("1"); // Initial key

  const [variables, updateVariables] = useState<string[]>([]);

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
  const [selectedUnitsString, setSelectedUnitsString] = useState<String[]>([]);
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

  const [unitFormulas, setUnitFormulas] = useState<string[]>([]);
  const [selectedFormulas, setSelectedFormulas] = useState<
    { unitIndex: number; formula: string }[]
  >([]);
  const toggleAddNew = () => {
    updateAddNew(!isAddNewActive);
    console.log(unitLabels);
    console.log(selectedUnits);
  };

  // const handleFormulaChange = (unitIndex: number, formula: string) => {
  //   const updatedFormulas = [...unitFormulas];
  //   updatedFormulas[unitIndex] = formula;
  //   setUnitFormulas(updatedFormulas);
  // };

  const handleSelectionChange = (selectedButtonIds: number[]) => {
    setSelectedUnits(selectedButtonIds);
    // Do whatever you need to do with the selected units in the parent component
    console.log("Selected Units in Parent:", selectedButtonIds);
  };

  const handleSelectionChangeString = (selectedButtonIds: String[]) => {
    setSelectedUnitsString(selectedButtonIds);
    // Do whatever you need to do with the selected units in the parent component
    console.log("Selected Units in Parent:", selectedButtonIds);
  };
  const handleRadioChange = (value: boolean) => {
    updateFib(value);
    console.log(hasMultiple);
    handleRadioChange;
  };
  // const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [unitLabels, updateUnitLabels] = useState<String[]>([]);
  const [selectedUnitLabels, updateSelectedUnitLabels] = useState<String[]>([]);
  const fetchUnits = async () => {
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
    fetchUnits();
  }, []);
  useEffect(() => {
    // Fetch variables from the server when the component mounts
    fetchVariables();
  }, [selectedUnits, unitsSelectorKey]);
  const fetchVariables = async () => {
    try {
      const response = await fetch(`${apiUrlBase}/api/getUnits`);
      const data = await response.json();
      const variableNames = Object.keys(data);
      updateVariables(variableNames);
      // updateUnitLabels(variableNames);
    } catch (error) {
      console.error("Error fetching variables:", error);
    }
  };
  const handleAddVariable = async (e: React.MouseEvent) => {
    try {
      // Ensure that selected variables are either the selected value or "1" if null
      // const var1 = newVar;

      // Your API endpoint for adding a new formula
      const response = await fetch(`${apiUrlBase}/api/addUnit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newVar,
        }),
      });

      if (response.ok) {
        console.log("Variable saved successfully!");
        // Reset state variables
        fetchVariables();
        fetchUnits();
        console.log(variables);
        updateVar("");
        setUnitsSelectorKey((prevKey) => (parseInt(prevKey) + 1).toString()); // Change the key to force remount
      } else {
        console.error("Failed to save var.");
      }
    } catch (error) {
      console.error("Error saving var:", error);
    }
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
      const response = await fetch(`${apiUrlBase}/api/allformulas`);
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
  }, [
    selectedUnits,
    // formulas
  ]);

  const radioContainerStyle = {
    display: "inline-flex",
    alignItems: "center",
    marginRight: "20px",
  };
  const handleFormulaChange = (unitIndex: number, formula: string) => {
    // Update selectedFormulas
    const updatedFormulas = [...selectedFormulas];
    const existingUnitIndex = updatedFormulas.findIndex(
      (item) => item.unitIndex === unitIndex
    );

    if (existingUnitIndex !== -1) {
      // Update existing entry
      updatedFormulas[existingUnitIndex] = { unitIndex, formula };
    } else {
      // Add new entry
      updatedFormulas.push({ unitIndex, formula });
    }

    setSelectedFormulas(updatedFormulas);

    // Update selectedUnits (if needed)
    const updatedUnits = [...selectedUnits];
    if (!updatedUnits.includes(unitIndex)) {
      updatedUnits.push(unitIndex);
      setSelectedUnits(updatedUnits);
    }
  };

  const radioStyle = {
    marginRight: "5px",
    cursor: "pointer",
  };
  const navigate = useNavigate();
  const saveOptionsToDatabase = async () => {
    try {
      const response = await fetch(`${apiUrlBase}/api/addQuestion`, {
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

  const [selectedLabels, setSelectedLabels] = useState<String[]>([]);

  // Update selectedLabels when selectedUnits or unitLabels change
  useEffect(() => {
    const updatedSelectedLabels = selectedUnits.map(
      (index) => unitLabels[index]
    );
    setSelectedLabels(updatedSelectedLabels);
  }, [selectedUnits, unitLabels]);

  return (
    <>
      <div className="container" style={{ fontSize: "16px" }}>
        <div
          className="row"
          style={{
            fontFamily: "Outfit-SemiBold, Helvetica",
            fontSize: "18px",
            fontWeight: "bold",
            // width: "60%",
            justifyContent: "center",
            display: "flex",
            paddingLeft: "20%",
            paddingRight: "20%",
          }}
        >
          <div className="col-sm-2">
            <input
              type="radio"
              name="radioGrp"
              style={{ width: "30px", height: "30px" }}
              onChange={() => handleRadioChange(true)}
              defaultChecked
            />
          </div>
          <div className="col-lg">Fill In the Blank</div>
          <div className="col-sm-2">
            <input
              type="radio"
              name="radioGrp"
              style={{ width: "30px", height: "30px" }}
              onChange={() => handleRadioChange(false)}
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
            <SwitchContent
              label="Allow Multiple"
              onChange={handleSwitchChange}
            />
          </div>
        )}
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            background: "#F5F5F5",
            paddingTop: "30px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontFamily: "Outfit-SemiBold, Helvetica",
              fontSize: "18px",
              fontWeight: "bold",
              paddingLeft: "20px",
              marginLeft: "20px",
            }}
          >
            Select Units
          </p>

          <UnitsSelector
            onSelectionChangeString={handleSelectionChangeString}
            onSelectionChange={handleSelectionChange}
            key={unitsSelectorKey}
          />
          <div
            style={{
              width: "100%",
              margin: "0 auto",
              fontSize: "18px",
              paddingBottom: "30px",
              paddingLeft: "40px",
              marginTop: "0px",
              paddingTop: "0px",
              fontFamily: "Outfit-SemiBold, Helvetica",
              // fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            <div className="row d-flex align-items-center" style={{}}>
              <p
                style={{
                  fontFamily: "Outfit-SemiBold, Helvetica",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                Add a new Unit
              </p>
              <div
                className="row d-flex align-items-center"
                style={{ marginLeft: "10%", marginRight: "10%" }}
              >
                <div className="col">
                  <input
                    type="text"
                    className="form-control rounded"
                    placeholder="Unit Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateVar(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="col">
                  <button
                    className="btn btn-success"
                    style={{
                      width: "200px",
                      backgroundColor: "#A7C8A3",
                      border: "black",
                    }}
                    onClick={handleAddVariable}
                  >
                    Add Unit
                  </button>
                </div>
              </div>
              {/* <div className="col-md">
              <Choice onValuesChange={getVarValues} />
            </div> */}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#F5F5F5",
            paddingTop: "10px",
            paddingBottom: "30px",
            width: "60%",
            marginTop: "40px",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              paddingLeft: "20px",
              alignItems: "center",
            }}
          >
            Select formula for the Unit selected
          </p>
          {/* {selectedLabels.map((unit) => (
            <div
              className="formula"
              style={{ marginLeft: "20%", marginRight: "20%" }}
            >
              <div className="row d-flex align-items-center">
                <div className="col text-center">{unit}</div>
                <div className="col text-center">
                  <select
                    className="form-select"
                    value={"" || ""}
                    onChange={(e) => {
                      // onFormulaChange(unitIndex, e.target.value);
                      // updateSelectedForm(e.target.value);
                    }}
                    style={{ width: "200px" }}
                    onClick={() => {
                      // fetchFormulas(); // You may want to fetch formulas here
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
          ))} */}
          {/* <FormulaSelector2 labels={selectedLabels} /> */}
          {selectedUnits.map((unitIndex, index) => (
            <FormulaSelector
              key={index}
              unitIndex={index}
              unitLabel={unitLabels[unitIndex]}
              selectedFormula={unitFormulas[index] || ""}
              onFormulaChange={handleFormulaChange}
              formulas={formulas}
            />
          ))}
        </div>
        {/* <div>
          {selectedLabels.map((unit) => {
            let ans = "";
            return (
              <div>
                <div className="row">
                  <div className="col">{unit}</div>
                  <div className="col">
                    <select
                      className="form-select"
                      value={ans || ""}
                      onChange={(e) => {
                        // onFormulaChange(unitIndex, e.target.value);
                        ans = e.target.value;
                      }}
                      style={{ width: "200px" }}
                      onClick={() => {
                        // fetchFormulas(); // You may want to fetch formulas here
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
            );
          })}
        </div> */}

        {/* <div>
          {selectedLabels.map((unit) => {
            return (
              <div>
                <div className="row">
                  <div className="col">{unit}</div>
                  <div className="col"></div>
                </div>
              </div>
            );
          })}
        </div> */}

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
        {isAddNewActive && <NewFormula isZipDependent={zipcode} />}
        {
          <>
            <div
              style={{
                width: "60%",
                margin: "0 auto",
              }}
            >
              <MultipleSelections
                isFib={isFib}
                choiceAns={choiceAns}
                enabled={enabled}
                household={household}
                label={label}
                questionContent={questionContent}
                questionType={questionType}
                selectedUnits={selectedLabels}
                zipcode={zipcode}
                integerArray={selectedUnits}
                stringArray={unitLabels}
                // onDataUpdate={handleDataUpdate}
              />
            </div>
          </>
        }

        {/* <div
          className="row"
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "30px",
          }}
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
              // onClick={saveOptionsToDatabase}
              onClick={() => {
                console.log(unitLabels);
                console.log(selectedUnits);
              }}
            >
              Save
            </button>
          </div>
          
        </div> */}
      </div>
    </>
  );
};

export default AllTypesUnits;
