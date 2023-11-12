import React, { ChangeEvent, useEffect, useState } from "react";
import NewFormula from "./NewFormula";
import UnitsSelector from "./UnitsSelector";
// import OptionValue from "./OptionValue";
import SwitchContent from "./SwitchContent";
import { useNavigate } from "react-router-dom";
import MultipleSelections from "./MultipleSelections";
import { apiUrlBase } from "../config";
import axios from "axios";

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

interface FormulaData {
  formulaName: string;
  var1: string;
  var2: string;
  var3: string;
  var4: string;
}
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
  questionData?: QuestionData;
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
  questionData,
}) => {
  const [isFib, updateFib] = useState(true);
  const [formulaName, setFormulaName] = useState(""); // Set the formulaName you want to fetch
  const [formulaData, setFormulaData] = useState<FormulaData | null>(null);

  useEffect(() => {
    const fetchFormula = async () => {
      try {
        const response = await axios.get<FormulaData>(
          `${apiUrlBase}/api/getFormula/${formulaName}`
        );
        setFormulaData(response.data);
      } catch (error) {
        console.error("Error fetching formula:", error);
        // Handle error, e.g., show a message to the user
      }
    };

    if (formulaName) {
      fetchFormula();
    }
  }, [formulaName]);

  const determineQuestionType = () => {
    if (isFib) {
      updateChoiceAns("1");
    } else if (!isFib && hasMultiple) {
      updateChoiceAns("3");
    } else {
      updateChoiceAns("2");
    }
  };
  const [ansMap, setAnsMap] = useState<{ [key: string]: string }>({});
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

  const [formulas, setFormulas] = useState<String[]>([]);
  const [isAddNewActive, updateAddNew] = useState(false);

  const [unitFormulas, setUnitFormulas] = useState<string[]>([]);
  const [selectedFormulas, setSelectedFormulas] = useState<
    { unitIndex: number; formula: string }[]
  >([]);
  const toggleAddNew = () => {
    updateAddNew(!isAddNewActive);
    console.log(selectedLabels);
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
    if (value) {
      updateChoiceAns("1");
    } else {
      if (hasMultiple) {
        updateChoiceAns("3");
      } else {
        updateChoiceAns("2");
      }
    }
    // determineQuestionType();
    // onChange(twoArrayOption, twoArrayValue, questionType);
  };
  const handleSwitchChange = (value: boolean) => {
    updateHasMultiple(value);
    // You can perform additional actions if needed
    determineQuestionType();
    console.log(questionType);

    if (value && !isFib) {
      updateChoiceAns("3");
    } else if (!isFib) {
      updateChoiceAns("2");
    }

    // onChange(twoArrayOption, twoArrayValue, questionType);
  };
  // const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [unitLabels, updateUnitLabels] = useState<String[]>([]);
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
    fetchVariables;
  }, []);
  // useEffect(() => {
  //   // Fetch variables from the server when the component mounts
  //   fetchVariables();
  // }, [selectedUnits]);
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

  // const handleSwitchChange = (value: boolean) => {
  //   updateHasMultiple(value);
  //   updateChoiceAns;
  //   // You can perform additional actions if needed
  // };

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

  useEffect(() => {
    fetchFormulas();
  }, [
    selectedUnits,
    // formulas
  ]);

  useEffect(() => {
    // if (questionData?.selectedUnits.length !== 0) {
    //   const indexesOfSelectedUnitsInABC = questionData?.selectedUnits.map(
    //     (unit) => unitLabels.indexOf(unit)
    //   );
    //   setSelectedUnits(indexesOfSelectedUnitsInABC || []);
    // }
  }, []);
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
  const [ans, setAns] = useState<string>("");
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
          choices: [], // Assuming twoArrayOption represents choices
          refs: [], // Assuming twoArrayValue represents refs
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

  const [labelMap, setLabelMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Create the map when selectedLabels change
    const newLabelMap = selectedLabels.reduce((map, label) => {
      // You can set any default string value here
      const primitiveLabel: string = label as string;
      map[primitiveLabel] = "Default Strig Value";
      return map;
    }, {} as { [key: string]: string });

    setLabelMap(newLabelMap);
  }, [selectedLabels]);

  const handleSelectChange = (label: string, formula: string) => {
    setAnsMap((prevAnsMap) => ({
      ...prevAnsMap,
      [label]: formula,
    }));
  };

  useEffect(() => {
    if (questionData) {
      if (questionData.choiceAns == "1") {
        updateFib(true);
        updateHasMultiple(false);
      } else if (questionData.choiceAns == "2") {
        updateFib(false);
        updateHasMultiple(false);
      } else {
        updateFib(false);
        updateHasMultiple(true);
      }
      updateChoiceAns(questionData.choiceAns);
    }
    const getSelected =
      questionData?.selectedUnits !== null
        ? questionData?.selectedUnits.map((element) =>
            unitLabels.indexOf(element)
          )
        : [];
    // const indexesOfXyzInAbc = xyz.map((element) => abc.indexOf(element));
    setSelectedUnits(getSelected || []);
    console.log(getSelected);
  }, []);

  return (
    <>
      {/* <button onClick={() => console.log(selectedUnits)}>shhshshshshs</button> */}
      <div className="container" style={{ fontSize: "16px" }}>
        <div
          className="row"
          style={{
            fontFamily: "Outfit-SemiBold, Helvetica",
            fontSize: "18px",
            fontWeight: "bold",
            width: "60%",
            margin: "0 auto",
          }}
        >
          <div className="col-sm-2" style={{ color: "white" }}>
            <input
              type="radio"
              name="radioGrp"
              style={{
                width: "30px",
                height: "30px",
                color: "black",
                background: "black",
              }}
              onChange={() => handleRadioChange(true)}
              defaultChecked
            />
          </div>
          <div className="col-lg" style={{ color: "white" }}>
            Fill In the Blank
          </div>
          <div className="col-sm-2">
            <input
              type="radio"
              name="radioGrp"
              style={{ width: "30px", height: "30px" }}
              onChange={() => handleRadioChange(false)}
            />
          </div>
          <div className="col-lg" style={{ color: "white" }}>
            Single / Multiple Selection
          </div>
        </div>
        {!isFib && (
          <div
            className="container"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              textAlign: "center",
              width: "35%",
              color: "white",
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
                      backgroundColor: "#FF5701",
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
            width: "80%",
            marginTop: "40px",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "20px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                paddingLeft: "40px",
              }}
            >
              Select formula for the Unit selected
            </p>
            <div>
              <button
                className="btn btn-info"
                onClick={() => {
                  fetchFormulas();
                  setFormulaName("");
                  setFormulaData(null);
                  console.log(selectedUnits);
                  console.log(unitLabels);
                  console.log(questionData?.selectedUnits);
                }}
                style={{
                  height: "35px",
                  background: "#FF5701",
                  color: "white",
                  border: "None",
                }}
              >
                <i
                  className="bi bi-bootstrap-reboot"
                  style={{ fontStyle: "normal" }}
                ></i>
              </button>
              <button
                className="btn btn-primary"
                style={{
                  // width: "200px",
                  width: "40px",
                  marginTop: "30px",
                  marginBottom: "30px",
                  backgroundColor: "#FF5701",
                  border: "#84D2F3",
                  marginLeft: "20px",
                }}
                onClick={toggleAddNew}
              >
                +
              </button>
            </div>
          </div>
          <div>
            {formulaData ? (
              <>
                <div
                  style={{
                    background: "#D3D3D3",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginRight: "10px",
                    marginLeft: "10px",
                    marginTop: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="row">
                    <div className="col" style={{}}>
                      <button
                        className="btn btn-info"
                        style={{ background: "white", border: "white" }}
                      >
                        {formulaData.formulaName}
                      </button>
                    </div>
                    <div className="col" style={{ fontSize: "30px" }}>
                      =
                    </div>

                    <div className="col">
                      <button
                        className="btn btn-info"
                        style={{ background: "white", border: "white" }}
                      >
                        Input
                      </button>{" "}
                    </div>
                    <div className="col">
                      <i className="bi bi-x" style={{ fontSize: "50px" }}></i>
                    </div>
                    <div className="col ">
                      <button
                        className="btn btn-info"
                        style={{ background: "white", border: "white" }}
                      >
                        {formulaData.var1}
                      </button>{" "}
                    </div>
                    <div className="col">
                      <i className="bi bi-x" style={{ fontSize: "50px" }}></i>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-info"
                        style={{ background: "white", border: "white" }}
                      >
                        {formulaData.var2}
                      </button>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col horizontal-line">
                      <button
                        className="btn btn-info"
                        style={{ background: "white", border: "white" }}
                      >
                        {formulaData.var3}
                      </button>{" "}
                    </div>
                    <div className="col"></div>
                    <div className="col horizontal-line">
                      <button
                        className="btn btn-info"
                        style={{ background: "white", border: "white" }}
                      >
                        {formulaData.var4}
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p></p>
            )}
          </div>

          {selectedLabels.map((label, index) => (
            <div
              key={index}
              style={{
                width: "50%",
                margin: "0 auto",
                paddingBottom: "10px",
                marginTop: "20px",
              }}
            >
              <div className="row">
                <div className="col" style={{ paddingTop: "10px" }}>
                  {label}
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    value={ansMap[label as string] || ""}
                    onChange={(e) =>
                      handleSelectChange(label as string, e.target.value)
                    }
                    style={{ width: "200px" }}
                  >
                    <option value="" disabled>
                      Select Formula
                    </option>
                    {formulas.map((formula, formulaIndex) => (
                      <option key={formulaIndex} value={formula as string}>
                        {formula}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="btn btn-primary"
                  style={{
                    paddingLeft: "2px",
                    width: "40px",
                    margin: "0 auto",
                    background: "#FF5701",
                    border: "None",
                  }}
                  onClick={() => {
                    if (
                      (label as string) in ansMap
                      // (label as string) in selectedLabels
                    ) {
                      setFormulaName(ansMap[label as string]);
                      console.log("entererd");
                    }
                  }}
                >
                  <i className="bi bi-question-circle"></i>{" "}
                </button>
                {/* <div className="col" style={{ width: "30px" }}></div> */}
              </div>
            </div>
          ))}
        </div>

        {isAddNewActive && <NewFormula isZipDependent={zipcode} />}
        {
          <>
            <div
              style={{
                width: "80%",
                margin: "0 auto",
              }}
            >
              <MultipleSelections
                ansMap={ansMap}
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
      </div>
    </>
  );
};

export default AllTypesUnits;
