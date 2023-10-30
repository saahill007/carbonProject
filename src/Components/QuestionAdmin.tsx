// import React, { useEffect, useState } from "react";
// import Ques from "./Ques";
// import "./QuestionAdmin.css";
// import SwitchContent from "./SwitchContent";
// import Content from "./Content";
// import AnswerTypeSelector from "./AnswerTypeSelector";
// import QuestionType1 from "./QuestionType1";
// import NewFormula from "./NewFormula";
// import AllTypesUnits from "./AllTypesUnits";
// import { useParams } from "react-router-dom";

// const QuestionAdmin = () => {
//   const { id } = useParams();
//   interface QuestionData {
//     questionContent: string;
//     household: boolean;
//     zipcode: boolean;
//     questionType: number;
//     enabled: boolean;
//     choiceAns: string;
//     choices: string[][];
//     refs: number[][];
//     selectedUnits: any[]; // Update the type based on your actual data structure
//     selectedFormulas: string[];
//     label: string;
//   }
//   // const [questionContent, updateQuestionContent] = useState("");
//   // const [household, updateHouseHold] = useState(false);
//   // const [zipcode, updateZipcode] = useState(false);
//   // const [questionType, updateQuestionType] = useState(1);
//   // const [enabled, updateEnabled] = useState(true);
//   // const [choiceAns, updateChoiceAns] = useState("1");
//   // const [choices, updateChoices] = useState<string[][]>([]);
//   // const [refs, updateRefs] = useState<number[][]>([]);
//   // const [selectedUnits, updateSelectedUnits] = useState([]);
//   // const [selectedFormulas, updateSelectedFormulas] = useState([
//   //   "",
//   //   "",
//   //   "",
//   //   "",
//   //   "",
//   //   "",
//   //   "",
//   // ]);
//   // const [label, updateLabel] = useState("");

//   const QuestionAdmin: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const [questionData, setQuestionData] = useState<QuestionData>({
//       questionContent: "",
//       household: false,
//       zipcode: false,
//       questionType: 1,
//       enabled: true,
//       choiceAns: "1",
//       choices: [],
//       refs: [],
//       selectedUnits: [],
//       selectedFormulas: ["", "", "", "", "", "", ""],
//       label: "",
//     });

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           if (id) {
//             // Fetch question data if ID is provided
//             const response = await fetch(`http://localhost:3001/api/question/${id}`);
//             if (!response.ok) {
//               throw new Error("Error fetching question data");
//             }
//             const questionData: QuestionData = await response.json();
//             setQuestionData(questionData);
//           } else {
//             // Handle default behavior when no ID is provided (e.g., fetch all questions)
//             // You can add logic here based on your requirements
//             console.log("No question ID provided");
//           }
//         } catch (error) {
//           console.error("Error fetching question data:", error);
//           // Handle error, e.g., redirect to an error page
//         }
//       };

//       fetchData();
//     }, [id]);

//     const handleQuestionChange = (newQuestion: string) => {
//       console.log("New Question:", newQuestion);
//       // You can perform additional actions based on the updated question
//       setQuestionData((prevData) => ({
//         ...prevData,
//         questionContent: newQuestion,
//       }));
//     };
//   // const handleQuestionChange = (newQuestion: string) => {
//   //   console.log("New Question:", newQuestion);
//   //   // You can perform additional actions based on the updated question
//   //   updateQuestionContent(newQuestion);
//   // };

//   // const handleSwitchChange1 = (value: boolean) => {
//   //   updateHouseHold(value);
//   // };

//   // const handleSwitchChange2 = (value: boolean) => {
//   //   updateZipcode(value);
//   // };

//   // const handleAnswerTypeSelect = (selectedType: number) => {
//   //   updateQuestionType(selectedType);
//   // };

//   // // const handleQuestionType1Values = (
//   // //   value1: number,
//   // //   choice1: string,
//   // //   value2: number,
//   // //   choice2: string
//   // // ) => {
//   // //   console.log("Received Values:", value1, choice1, value2, choice2);
//   // //   updateChoice1(choice1);
//   // //   updateChoice2(choice2);
//   // //   updateRef1(value1);
//   // //   updateRef2(value2);
//   // // };

//   // const saveDataToServer = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:3001/api/addData/", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         questionContent,
//   //         household,
//   //         zipcode,
//   //         questionType,
//   //         enabled,
//   //         choiceAns,
//   //         choices,
//   //         refs,
//   //         selectedUnits,
//   //         selectedFormulas,
//   //         label,
//   //       }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Error saving data to the server");
//   //     }

//   //     console.log("Data saved successfully!");
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   // const handleSaveClick = () => {
//   //   // Optionally perform validation or other logic before saving
//   //   saveDataToServer();
//   // };
//   // const handleChildComponentChange1 = (
//   //   option: string[][],
//   //   value: number[][],
//   //   type: string
//   // ) => {
//   //   updateChoices(option);
//   //   updateRefs(value);
//   //   updateChoiceAns(type);
//   //   console.log(option, " ", value, " ", type);
//   // };

//   const QuestionAdmin: React.FC = () => {
//     // ... (existing code)

//     const handleSwitchChange1 = (value: boolean) => {
//       setQuestionData((prevData) => ({
//         ...prevData,
//         household: value,
//       }));
//     };

//     const handleSwitchChange2 = (value: boolean) => {
//       setQuestionData((prevData) => ({
//         ...prevData,
//         zipcode: value,
//       }));
//     };

//     const handleAnswerTypeSelect = (selectedType: number) => {
//       setQuestionData((prevData) => ({
//         ...prevData,
//         questionType: selectedType,
//       }));
//     };

//     const handleChildComponentChange1 = (
//       option: string[][],
//       value: number[][],
//       type: string
//     ) => {
//       setQuestionData((prevData) => ({
//         ...prevData,
//         choices: option,
//         refs: value,
//         choiceAns: type,
//       }));
//       console.log(option, " ", value, " ", type);
//     };

//     const saveDataToServer = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/api/addData/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(questionData), // Send the entire questionData
//         });

//         if (!response.ok) {
//           throw new Error("Error saving data to the server");
//         }

//         console.log("Data saved successfully!");
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     const handleSaveClick = () => {
//       // Optionally perform validation or other logic before saving
//       saveDataToServer();
//     };

//     return (
//       <>
//         <Ques onQuestionChange={handleQuestionChange} />
//         <div className="container">
//           <SwitchContent
//             label="Does this Question depend on number of people in the household?"
//             onChange={handleSwitchChange1}
//           />
//         </div>
//         <div className="container" style={{ paddingTop: "10px" }}>
//           <SwitchContent
//             label="Does this Question take the zip code into consideration?"
//             onChange={handleSwitchChange2}
//           />
//         </div>
//         <div className="container">
//           <Content inputText="Select the type of answer you want" />
//         </div>

//         <AnswerTypeSelector onSelect={handleAnswerTypeSelect} />
//         <div className="parentContainer">
//           <div className="answerContainer">
//             {questionData.questionType === 1 && (
//               <QuestionType1
//                 onChange={handleChildComponentChange1}
//                 enabled={questionData.enabled}
//                 household={questionData.household}
//                 label={questionData.label}
//                 questionContent={questionData.questionContent}
//                 questionType={questionData.questionType}
//                 selectedFormulas={questionData.selectedFormulas}
//                 selectedUnits={questionData.selectedUnits}
//                 zipcode={questionData.zipcode}
//               />
//             )}

//             {questionData.questionType === 2 && (
//               <AllTypesUnits
//                 questionContent={questionData.questionContent}
//                 enabled={questionData.enabled}
//                 household={questionData.household}
//                 label={questionData.label}
//                 questionType={questionData.questionType}
//                 zipcode={questionData.zipcode}
//                 onArraysChange={(option: string[][], value: number[][]) => {
//                   console.log(option);
//                   console.log(value);
//                 }}
//               />
//             )}
//           </div>
//         </div>
//         {/* Additional UI elements based on your logic */}
//         {/* For example, Save and Back buttons */}
//         <div className="row" style={{ marginLeft: "10%", marginRight: "10%", marginBottom: "30px" }}>
//           <div className="col">
//             {/* Back button */}
//             <button
//               className="btn btn-primary"
//               style={{ backgroundColor: "#A7C8A3", border: "0px" }}
//             >
//               Back
//             </button>
//           </div>
//           <div className="col">
//             {/* Save button */}
//             <button
//               className="btn btn-primary"
//               style={{ backgroundColor: "#A7C8A3", border: "0px" }}
//               onClick={handleSaveClick}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </>
//     );

// //   return (
// //     <>
// //       <Ques onQuestionChange={handleQuestionChange}></Ques>
// //       <div className="container">
// //         <SwitchContent
// //           label="Does this Question depend on number of people in the household?"
// //           onChange={handleSwitchChange1}
// //         ></SwitchContent>
// //       </div>
// //       <div className="container" style={{ paddingTop: "10px" }}>
// //         <SwitchContent
// //           label="Does this Question take the zip code into consideration?"
// //           onChange={handleSwitchChange2}
// //         ></SwitchContent>
// //       </div>
// //       <div className="container">
// //         <Content inputText="Select the type of answer you want"></Content>
// //       </div>

// //       <AnswerTypeSelector onSelect={handleAnswerTypeSelect} />
// //       <div className="parentContainer">
// //         <div className="answerContainer">
// //           {questionType === 1 && (
// //             <div>
// //               {/* Content for Answer Type 2 */}
// //               <QuestionType1
// //                 onChange={handleChildComponentChange1}
// //                 enabled={enabled}
// //                 household={household}
// //                 label={label}
// //                 questionContent={questionContent}
// //                 questionType={questionType}
// //                 selectedFormulas={selectedFormulas}
// //                 selectedUnits={selectedUnits}
// //                 zipcode={zipcode}
// //               />
// //             </div>
// //           )}

// //           {questionType === 2 && (
// //             <div>
// //               <AllTypesUnits
// //                 questionContent={questionContent}
// //                 enabled={enabled}
// //                 household={household}
// //                 label={label}
// //                 questionType={questionType}
// //                 zipcode={zipcode}
// //                 onArraysChange={(option: string[][], value: number[][]) => {
// //                   console.log(option);
// //                   console.log(value);
// //                 }}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       {/* {questionType == 1 ? (
// //         <div
// //           className="row"
// //           style={{
// //             marginLeft: "10%",
// //             marginRight: "10%",
// //             marginBottom: "30px",
// //           }}
// //         >
// //           <div className="col">
// //             <button
// //               className="btn btn-primary"
// //               style={{ backgroundColor: "#A7C8A3", border: "0px" }}
// //             >
// //               Back
// //             </button>
// //           </div>
// //           <div className="col">
// //             <button
// //               className="btn btn-primary"
// //               style={{ backgroundColor: "#A7C8A3", border: "0px" }}
// //               onClick={() => {
// //                 console.log(questionContent);
// //                 console.log(household, " ", zipcode);
// //                 console.log(questionType);
// //                 console.log(enabled);
// //                 console.log(choices);
// //                 console.log(refs);
// //                 console.log(selectedUnits);
// //                 console.log(selectedFormulas);
// //                 console.log(choiceAns);
// //                 console.log(label);
// //               }}
// //             >
// //               Save
// //             </button>
// //           </div>
// //         </div>
// //       ) : (
// //         <div></div>
// //       )} */}
// //     </>
// //   );
// // };

// export default QuestionAdmin;
import React, { useEffect, useState } from "react";
import Ques from "./Ques";
import "./QuestionAdmin.css";
import SwitchContent from "./SwitchContent";
import Content from "./Content";
import AnswerTypeSelector from "./AnswerTypeSelector";
import QuestionType1 from "./QuestionType1";
import NewFormula from "./NewFormula";
import AllTypesUnits from "./AllTypesUnits";
import { useParams } from "react-router-dom";
type Category = {
  categoryId: number;
  categoryName: string;
};
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

const QuestionAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const [categories, updateVariables] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [questionData, setQuestionData] = useState<QuestionData>({
    questionContent: "",
    household: false,
    zipcode: false,
    questionType: 1,
    enabled: true,
    choiceAns: "1",
    choices: [],
    refs: [],
    selectedUnits: [],
    selectedFormulas: ["", "", "", "", "", "", ""],
    label: "",
  });
  const [categories, updateCategories] = useState<Category[]>([]);
  const [questionEmptyError, updateQuestionEmptyError] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Fetch question data if ID is provided
          const response = await fetch(
            `http://localhost:3001/api/question/${id}`
          );
          if (!response.ok) {
            throw new Error("Error fetching question data");
          }
          const questionData: QuestionData = await response.json();
          setQuestionData(questionData);
          console.log(questionData);
        } else {
          // Handle default behavior when no ID is provided (e.g., fetch all questions)
          // You can add logic here based on your requirements
          console.log("No question ID provided");
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchData();
  }, [id]);

  const handleQuestionChange = (newQuestion: string) => {
    setQuestionData((prevData) => ({
      ...prevData,
      questionContent: newQuestion,
    }));
    questionData.questionContent == ""
      ? updateQuestionEmptyError(true)
      : updateQuestionEmptyError(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/getCategories");
      const data = await response.json();
      updateCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSwitchChange1 = (value: boolean) => {
    setQuestionData((prevData) => ({
      ...prevData,
      household: value,
    }));
  };

  const handleSwitchChange2 = (value: boolean) => {
    setQuestionData((prevData) => ({
      ...prevData,
      zipcode: value,
    }));
  };

  const handleAnswerTypeSelect = (selectedType: number) => {
    setQuestionData((prevData) => ({
      ...prevData,
      questionType: selectedType,
    }));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;

    // Check if a category is selected
    setCategoryError(
      selectedCategory.trim() === "" ? "Select a category" : null
    );

    setQuestionData({
      ...questionData,
      label: selectedCategory,
    });
  };

  const handleChildComponentChange1 = (
    option: string[][],
    value: number[][],
    type: string
  ) => {
    setQuestionData((prevData) => ({
      ...prevData,
      choices: option,
      refs: value,
      choiceAns: type,
    }));
    console.log(option, " ", value, " ", type);
  };

  const saveDataToServer = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/addData/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData), // Send the entire questionData
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
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Ques
        onQuestionChange={handleQuestionChange}
        defaultQuestion={questionData.questionContent}
      />

      <div className="container">
        <SwitchContent
          label="Does this Question depend on number of people in the household?"
          onChange={handleSwitchChange1}
          defaultChecked={questionData.household}
        />
      </div>
      <div className="container" style={{ paddingTop: "10px" }}>
        <SwitchContent
          label="Does this Question take the zip code into consideration?"
          onChange={handleSwitchChange2}
          defaultChecked={questionData.zipcode}
        />
      </div>
      <div className="container" style={{ paddingTop: "10px" }}>
        <div
          className="row d-flex"
          style={{ paddingLeft: "15%", paddingRight: "15%", marginTop: "0px" }}
        >
          <div className="col-md">
            <p
              style={{
                fontSize: "large",
                padding: "10px 0px 10px 10px",
                marginRight: "20px",
                width: "400px",
              }}
            >
              Select the Category for this question
            </p>
          </div>
          <div
            className="col-md"
            style={{ alignItems: "end", paddingLeft: "270px" }}
          >
            <select
              className="form-select"
              value={questionData.label}
              onChange={handleCategoryChange}
              style={{ width: "200px" }}
            >
              <option value="" disabled>
                Select Utility
              </option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {categoryError && (
              <p style={{ color: "red", marginTop: "5px" }}>{categoryError}</p>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <Content inputText="Select the type of answer you want" />
      </div>

      <AnswerTypeSelector
        onSelect={handleAnswerTypeSelect}
        defaultSelectedType={questionData.questionType}
      />
      <div className="parentContainer">
        <div className="answerContainer">
          {questionData.questionType === 1 && (
            <QuestionType1
              onChange={handleChildComponentChange1}
              enabled={questionData.enabled}
              household={questionData.household}
              label={questionData.label}
              questionContent={questionData.questionContent}
              questionType={questionData.questionType}
              selectedFormulas={questionData.selectedFormulas}
              selectedUnits={questionData.selectedUnits}
              zipcode={questionData.zipcode}
            />
          )}

          {questionData.questionType === 2 && (
            <AllTypesUnits
              questionContent={questionData.questionContent}
              enabled={questionData.enabled}
              household={questionData.household}
              label={questionData.label}
              questionType={questionData.questionType}
              zipcode={questionData.zipcode}
              onArraysChange={(option: string[][], value: number[][]) => {
                console.log(option);
                console.log(value);
              }}
            />
          )}
        </div>
      </div>
      {/* Additional UI elements based on your logic */}
      {/* For example, Save and Back buttons */}
      <div
        className="row"
        style={{ marginLeft: "10%", marginRight: "10%", marginBottom: "30px" }}
      >
        <div className="col">
          {/* Back button
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#A7C8A3", border: "0px" }}
          >
            Back
          </button> */}
        </div>
        <div className="col">
          {/* Save button */}
          {/* <button
            className="btn btn-primary"
            style={{ backgroundColor: "#A7C8A3", border: "0px" }}
            onClick={handleSaveClick}
          >
            Save
          </button> */}
        </div>
      </div>
    </>
  );
};

export default QuestionAdmin;
