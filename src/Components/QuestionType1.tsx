// QuestionType1 Component
import React, { useEffect, useState } from "react";
import SwitchContent from "./SwitchContent";
// import OptionValue from "./OptionValue";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
  selectedUnits: any[]; // Update the type based on your actual data structure
  selectedFormulas: string[];
  label: string;
}
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
  questionData: QuestionData;
}
interface DataItem {
  name: string;
  value: number;
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
  questionData,
}) => {
  let { id } = useParams<{ id: string }>();

  // const [twoArrayOption, setTwoArrayOption] = useState<string[][]>([]);
  // const [twoArrayValue, setTwoArrayValue] = useState<number[][]>([]);
  // const [optionCount, updateOptionCount] = useState<number>(4);
  const [choiceAns, updateChoiceAns] = useState("1");
  const [deletedKeys, updateDeletedKeys] = useState<string[]>([]);
  const [type1Ans, updateType1Ans] = useState<number>(1);
  // const [inputs, updateInputs] = useState<InputOptions[]>([]);
  const navigate = useNavigate();
  const [data, setData] = useState<DataItem[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newValue, setNewValue] = useState<number | string>("");
  // Function to initialize arrays
  // const initializeArrays = () => {
  //   const numRows: number = 7;
  //   const numCols: number = 8;

  //   // Initialize the 2D array with empty strings
  //   const optionArray: string[][] = [];
  //   for (let i = 0; i < numRows; i++) {
  //     let row: string[] = [];
  //     for (let j = 0; j < numCols; j++) {
  //       row.push("");
  //     }
  //     optionArray.push(row);
  //   }

  //   // Initialize the 2D array with number 1
  //   const valueArray: number[][] = [];
  //   for (let i = 0; i < numRows; i++) {
  //     let row: number[] = [];
  //     for (let j = 0; j < numCols; j++) {
  //       row.push(1);
  //     }
  //     valueArray.push(row);
  //   }

  //   // Set state variables
  //   setTwoArrayOption(optionArray);
  //   setTwoArrayValue(valueArray);
  // };
  const handleAddValue = () => {
    // Validate that both name and value are provided
    if (newName && newValue !== "") {
      // Update the data state with the new value
      setData([...data, { name: newName, value: Number(newValue) }]);
      // Clear the input fields
      setNewName("");
      setNewValue("");
    }
  };

  // Function to handle deleting a value
  const handleDeleteValue = (index: number) => {
    // Create a copy of the data array without the item to be deleted
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    // Update the data state
    setData(newData);
  };
  const [isFib, updateFib] = useState(true);
  const determineQuestionType = () => {
    if (isFib) {
      updateChoiceAns("1");
    } else if (!isFib && hasMultiple) {
      updateChoiceAns("3");
    } else {
      updateChoiceAns("2");
    }
  };

  const [hasMultiple, updateHasMultiple] = useState(false);
  // React.useEffect(() => {
  //   initializeArrays();
  // }, [isFib, hasMultiple]);

  useEffect(() => {
    determineQuestionType();
    if (id === undefined) {
      id = "";
    }
  }, []);
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

  useEffect(() => {
    if (questionData.choiceAns === "1" && questionData.refs?.[0]?.[0] != null) {
      updateFib(true);
      determineQuestionType();
      console.log("inside1");
      updateType1Ans(questionData.refs[0][0]);
    }

    if (questionData.choiceAns === "2" && questionData.refs?.[0] != null) {
      updateFib(false);

      updateHasMultiple(false);
      determineQuestionType();
      console.log("inside2");
      const flattenedChoices = questionData.choices.flat();

      // Create an array of objects where each object has a 'name' property from flattenedChoices
      // and a 'value' property from refs
      const newData: DataItem[] = flattenedChoices.map((choice, index) => ({
        name: choice,
        value: questionData.refs[0]?.[index] ?? 0, // Adjust the default value as needed
      }));

      // Update the data state
      setData(newData);
    }

    if (questionData.choiceAns === "3" && questionData.refs?.[0] != null) {
      updateFib(false);
      updateHasMultiple(true);
      determineQuestionType;
      console.log("inside3");
      const flattenedChoices = questionData.choices.flat();

      // Create an array of objects where each object has a 'name' property from flattenedChoices
      // and a 'value' property from refs
      const newData: DataItem[] = flattenedChoices.map((choice, index) => ({
        name: choice,
        value: questionData.refs[0]?.[index] ?? 0, // Adjust the default value as needed
      }));

      // Update the data state
      setData(newData);
    }
  }, [questionData]);

  // const handleReferenceValueChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = parseFloat(event.target.value);
  //   setTwoArrayValue((prevTwoArrayValue) => {
  //     const newTwoArrayValue = [...prevTwoArrayValue];
  //     newTwoArrayValue[0][0] = isNaN(value) ? 0 : value;
  //     return newTwoArrayValue;
  //   });

  //   // Call onChange with the updated values
  //   // onChange(twoArrayOption, twoArrayValue, questionType);
  // };

  // const handleValuesChange = (index: number, choice: string, value: number) => {
  //   // Update twoArrayOption
  //   setTwoArrayOption((prevTwoArrayOption) => {
  //     const newTwoArrayOption = [...prevTwoArrayOption];
  //     newTwoArrayOption[0][index] = choice;
  //     return newTwoArrayOption;
  //   });

  //   // Update twoArrayValue
  //   setTwoArrayValue((prevTwoArrayValue) => {
  //     const newTwoArrayValue = [...prevTwoArrayValue];
  //     newTwoArrayValue[0][index] = value;
  //     return newTwoArrayValue;
  //   });

  //   // Call onChange with the updated values
  //   // onChange(twoArrayOption, twoArrayValue, questionType);
  // };
  //
  const generateChoiceAndRefsArrays = (data: DataItem[]) => {
    const choicess: string[] = [];
    const refss: number[] = [];

    data.forEach((item) => {
      choicess.push(item.name);
      refss.push(item.value);
    });

    return { choicess, refss };
  };

  const saveOptionsToDatabase = async () => {
    // console.log(id);
    try {
      console.log("This is id:" + id);
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
          questionType,
          enabled,
          choiceAns,
          choices: [],
          refs: [[type1Ans]],
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

  const saveOptionsToDatabase2 = async () => {
    const { choicess, refss } = generateChoiceAndRefsArrays(data);
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
          questionType,
          enabled,
          choiceAns,
          choices: [choicess],
          refs: [refss],
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

  const handleDeleteOption = (key: string) => {
    // Handle the deletion logic here
    // updateOptionCount(optionCount - 1);
    // updateDeletedKeys([...deletedKeys, key]);

    updateDeletedKeys((prevDeletedKeys) => [...prevDeletedKeys, key]);
    console.log("Option deleted!");
  };
  // const [inputArr, updateInputArr] = useState<String[]>([]);

  return (
    <>
      <div className="container" style={{ width: "60%" }}>
        <div
          className="row"
          style={{
            fontFamily: "Outfit-SemiBold, Helvetica",
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <div className="col-sm-2">
            <input
              type="radio"
              name="radioGrp"
              style={{ width: "30px", height: "30px" }}
              onChange={() => handleRadioChange(true)}
              checked={isFib}
            />
          </div>
          <div className="col-lg">Fill In the Blank</div>
          <div className="col-sm-2">
            <input
              type="radio"
              name="radioGrp"
              style={{ width: "30px", height: "30px" }}
              onChange={() => handleRadioChange(false)}
              checked={!isFib}
            />
          </div>
          <div className="col-lg">Single / Multiple Selection</div>
        </div>
        {isFib && (
          <div
            className="container"
            style={{
              paddingTop: "10px",
              marginTop: "10px",
              width: "70%",
              color: "white",
            }}
          >
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              Carbon Footprint Reference Value
            </p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              (This value will be multiplied to the answer)
            </p>
            <input
              className="form-control rounded"
              type="number"
              value={type1Ans}
              // onChange={handleReferenceValueChange}
              onChange={(e) => updateType1Ans(parseFloat(e.target.value))}
              style={{ paddingLeft: "15px" }}
            ></input>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "black", border: "0px" }}
              // onClick={saveOptionsToDatabase}
              onClick={() => {
                saveOptionsToDatabase();
              }}
            >
              Save
            </button>
          </div>
        )}
        {!isFib && (
          <div>
            <div
              className="container"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "60%",
                color: "white",
              }}
            >
              <SwitchContent
                label="Allow Multiple"
                onChange={handleSwitchChange}
                defaultChecked={hasMultiple}
              />
            </div>
            <div style={{}}>
              <div
                className="Updatedtable"
                style={{
                  background: "white",
                  paddingLeft: "20px",
                  paddingTop: "30px",
                  borderRadius: "10px",
                  marginBottom: "30px",
                }}
              >
                <div
                  className="row align-items-center justify-content-center"
                  style={{ fontSize: "16px" }}
                >
                  <div className="col">Name</div>
                  <div className="col">Value</div>
                  <div className="col">Action</div>
                </div>
                {data.map((item, index) => (
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
                        onClick={() => handleDeleteValue(index)}
                        style={{
                          width: "150px",
                          background: "black",
                          border: "None",
                        }}
                      >
                        <i className="bi bi-trash"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                <div>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control rounded"
                        id="newName"
                        placeholder="Option..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control rounded"
                        id="newValue"
                        placeholder="value..."
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-primary"
                        onClick={handleAddValue}
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
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "black", border: "0px" }}
                    // onClick={saveOptionsToDatabase}
                    onClick={() => {
                      console.log(questionData);
                      console.log(type1Ans);
                      console.log(data);
                      saveOptionsToDatabase2();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* <div
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
                    updateOptionCount(optionCount + 1);

                    console.log(deletedKeys);
                    console.log(twoArrayOption);
                  }}
                >
                  Add New Option
                </button>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionType1;
