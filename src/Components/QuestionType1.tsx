// QuestionType1 Component
import React, { useState } from "react";
import SwitchContent from "./SwitchContent";
import OptionValue from "./OptionValue";
import { useNavigate } from "react-router-dom";

interface QuestionType1Props {
  onChange: (option: string[][], value: number[][], type: string) => void;
  questionContent: string;
  household: boolean;
  zipcode: boolean;
  questionType: number;
  enabled: boolean;
  selectedUnits: any[]; // Replace 'any' with the actual type of selectedUnits
  selectedFormulas: string[]; // Replace 'string' with the actual type of selectedFormulas
  label: string;
}

const QuestionType1: React.FC<QuestionType1Props> = ({
  onChange,
  questionContent,
  household,
  zipcode,
  questionType,
  enabled,
  selectedUnits,
  selectedFormulas,
  label,
}) => {
  const [twoArrayOption, setTwoArrayOption] = useState<string[][]>([]);
  const [twoArrayValue, setTwoArrayValue] = useState<number[][]>([]);
  const [optionCount, updateOptionCount] = useState<number>(4);
  const [choiceAns, updateChoiceAns] = useState("1");
  const navigate = useNavigate();
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
  };
  const determineQuestionType = () => {
    if (isFib) {
      updateChoiceAns("1");
    } else if (!isFib && hasMultiple) {
      updateChoiceAns("3");
    } else {
      updateChoiceAns("2");
    }
  };
  const [isFib, updateFib] = useState(true);
  const [hasMultiple, updateHasMultiple] = useState(false);
  React.useEffect(() => {
    initializeArrays();
  }, [isFib, hasMultiple]);

  const radioContainerStyle = {
    display: "inline-flex",
    alignItems: "center",
    marginRight: "20px",
  };

  const radioStyle = {
    marginRight: "5px",
    cursor: "pointer",
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

  const handleReferenceValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setTwoArrayValue((prevTwoArrayValue) => {
      const newTwoArrayValue = [...prevTwoArrayValue];
      newTwoArrayValue[0][0] = isNaN(value) ? 0 : value;
      return newTwoArrayValue;
    });

    // Call onChange with the updated values
    // onChange(twoArrayOption, twoArrayValue, questionType);
  };

  const handleValuesChange = (index: number, choice: string, value: number) => {
    // Update twoArrayOption
    setTwoArrayOption((prevTwoArrayOption) => {
      const newTwoArrayOption = [...prevTwoArrayOption];
      newTwoArrayOption[0][index] = choice;
      return newTwoArrayOption;
    });

    // Update twoArrayValue
    setTwoArrayValue((prevTwoArrayValue) => {
      const newTwoArrayValue = [...prevTwoArrayValue];
      newTwoArrayValue[0][index] = value;
      return newTwoArrayValue;
    });

    // Call onChange with the updated values
    // onChange(twoArrayOption, twoArrayValue, questionType);
  };
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
        <div>
          <div
            className="container"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            <SwitchContent
              label="Allow Multiple"
              onChange={handleSwitchChange}
            />
            {
              <div
                className="unitOptions"
                style={{
                  background: "#c2c1be",
                  marginTop: "10px",
                  borderRadius: "20px",
                }}
              >
                <div
                  className="row"
                  style={{
                    fontFamily: "Outfit-SemiBold, Helvetica",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingLeft: "20px",
                    paddingTop: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <div className="col">(Select Option)</div>

                  <div className="col">(Value In Carbon Footprints)</div>
                </div>
                {/* {1 <= optionCount && ( */}
                {Array.from({ length: optionCount }).map((_, index) => (
                  <OptionValue
                    key={index}
                    onValuesChange={(choice: string, value: number) => {
                      // Use the spread operator to create a new array and update the specific index
                      setTwoArrayOption((prevOptions) => {
                        const newOptions = [...prevOptions];
                        newOptions[0] = [...newOptions[0]];
                        newOptions[0][index] = choice;
                        return newOptions;
                      });

                      setTwoArrayValue((prevValues) => {
                        const newValues = [...prevValues];
                        newValues[0] = [...newValues[0]];
                        newValues[0][index] = value;
                        return newValues;
                      });

                      // Call onChange with the updated values
                      // onChange(twoArrayOption, twoArrayValue, questionType);
                    }}
                  />
                ))}
              </div>
            }
          </div>
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
        </div>
      )}
      {isFib && (
        <div
          className="container"
          style={{ paddingTop: "10px", marginTop: "10px" }}
        >
          <p style={{ fontSize: "18px", textAlign: "center" }}>
            Carbon Footprint Reference Value
          </p>
          <p
            style={{ fontSize: "18px", fontWeight: "400", textAlign: "center" }}
          >
            (This value will be multiplied to the answer)
          </p>
          <input
            className="form-control rounded"
            type="number"
            onChange={handleReferenceValueChange}
          ></input>
        </div>
      )}
      <div
        className="row"
        style={{
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: "30px",
          marginTop: "20px",
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
            onClick={saveOptionsToDatabase}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionType1;
