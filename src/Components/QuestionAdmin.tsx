import React, { useState } from "react";
import Ques from "./Ques";
import "./QuestionAdmin.css";
import SwitchContent from "./SwitchContent";
import Content from "./Content";
import AnswerTypeSelector from "./AnswerTypeSelector";
import QuestionType1 from "./QuestionType1";
import NewFormula from "./NewFormula";
import AllTypesUnits from "./AllTypesUnits";

const QuestionAdmin = () => {
  const [questionContent, updateQuestionContent] = useState("");
  const [household, updateHouseHold] = useState(false);
  const [zipcode, updateZipcode] = useState(false);
  const [questionType, updateQuestionType] = useState(1);
  const [enabled, updateEnabled] = useState(true);
  const [choiceAns, updateChoiceAns] = useState("1");
  const [choices, updateChoices] = useState<string[][]>([]);
  const [refs, updateRefs] = useState<number[][]>([]);
  const [selectedUnits, updateSelectedUnits] = useState([]);
  const [selectedFormulas, updateSelectedFormulas] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [label, updateLabel] = useState("");

  const handleQuestionChange = (newQuestion: string) => {
    console.log("New Question:", newQuestion);
    // You can perform additional actions based on the updated question
    updateQuestionContent(newQuestion);
  };

  const handleSwitchChange1 = (value: boolean) => {
    updateHouseHold(value);
  };

  const handleSwitchChange2 = (value: boolean) => {
    updateZipcode(value);
  };

  const handleAnswerTypeSelect = (selectedType: number) => {
    updateQuestionType(selectedType);
  };

  // const handleQuestionType1Values = (
  //   value1: number,
  //   choice1: string,
  //   value2: number,
  //   choice2: string
  // ) => {
  //   console.log("Received Values:", value1, choice1, value2, choice2);
  //   updateChoice1(choice1);
  //   updateChoice2(choice2);
  //   updateRef1(value1);
  //   updateRef2(value2);
  // };

  const saveDataToServer = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/addData/", {
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
          choices,
          refs,
          selectedUnits,
          selectedFormulas,
          label,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving data to the server");
      }

      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveClick = () => {
    // Optionally perform validation or other logic before saving
    saveDataToServer();
  };
  const handleChildComponentChange1 = (
    option: string[][],
    value: number[][],
    type: string
  ) => {
    updateChoices(option);
    updateRefs(value);
    updateChoiceAns(type);
    console.log(option, " ", value, " ", type);
  };
  return (
    <>
      <Ques onQuestionChange={handleQuestionChange}></Ques>
      <div className="container">
        <SwitchContent
          label="Does this Question depend on number of people in the household?"
          onChange={handleSwitchChange1}
        ></SwitchContent>
      </div>
      <div className="container" style={{ paddingTop: "10px" }}>
        <SwitchContent
          label="Does this Question take the zip code into consideration?"
          onChange={handleSwitchChange2}
        ></SwitchContent>
      </div>
      <div className="container">
        <Content inputText="Select the type of answer you want"></Content>
      </div>

      <AnswerTypeSelector onSelect={handleAnswerTypeSelect} />
      <div className="parentContainer">
        <div className="answerContainer">
          {questionType === 1 && (
            <div>
              {/* Content for Answer Type 2 */}
              <QuestionType1
                onChange={handleChildComponentChange1}
                enabled={enabled}
                household={household}
                label={label}
                questionContent={questionContent}
                questionType={questionType}
                selectedFormulas={selectedFormulas}
                selectedUnits={selectedUnits}
                zipcode={zipcode}
              />
            </div>
          )}

          {questionType === 2 && (
            <div>
              <AllTypesUnits
                questionContent={questionContent}
                enabled={enabled}
                household={household}
                label={label}
                questionType={questionType}
                zipcode={zipcode}
                onArraysChange={(option: string[][], value: number[][]) => {
                  console.log(option);
                  console.log(value);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* {questionType == 1 ? (
        <div
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
              onClick={() => {
                console.log(questionContent);
                console.log(household, " ", zipcode);
                console.log(questionType);
                console.log(enabled);
                console.log(choices);
                console.log(refs);
                console.log(selectedUnits);
                console.log(selectedFormulas);
                console.log(choiceAns);
                console.log(label);
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )} */}
    </>
  );
};

export default QuestionAdmin;
