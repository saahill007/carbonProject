import AddVar from "./AddVar";
import Choice from "./Choice";
import { Desktop } from "./Desktop";
import DisplayFormulas from "./DisplayFormulas";
import NewFormula from "./NewFormula";
import Ques from "./Ques";
import QuestionAdmin from "./QuestionAdmin";
import RefValueSelector from "./RefValueSelector";
// import UnitsSelector from "./unitsSelector";

const Formulas = () => {
  const handleSelectionChange = (selectedButtonIds: number[]) => {
    console.log("Selected Button IDs:", selectedButtonIds);
    // You can perform additional actions based on the selected button IDs
  };

  const handleQuestionChange = (newQuestion: string) => {
    console.log("New Question:", newQuestion);
    // You can perform additional actions based on the updated question
  };
  const handleValuesChange = (choice: string, value: number) => {
    console.log("Choice:", choice);
    console.log("Value:", value);
    // You can perform additional actions based on the updated values
  };

  const dummyData = [
    { id: 1, name: "Option 1", value: 100 },
    { id: 2, name: "Option 2", value: 200 },
    { id: 3, name: "Option 3", value: 300 },
    // Add more dummy data as needed
  ];

  const handleValueSelect = (selectedValue: number) => {
    console.log("Selected Value:", selectedValue);
    // You can perform additional actions based on the selected value
  };
  const handleValueAdd = (name: string, value: number) => {
    console.log("Adding Value:", name, value);
    // Perform actions to add the new value to your data or database
  };

  return (
    <div>
      {/* <UnitsSelector onSelectionChange={handleSelectionChange} />
      <Ques onQuestionChange={handleQuestionChange} />
      <Choice onValuesChange={handleValuesChange} />
      <RefValueSelector onSelect={handleValueSelect} onAdd={handleValueAdd} /> */}
      {/* <QuestionAdmin /> */}
      {/* <Desktop />
      {/* <Choice onValuesChange={handleValuesChange} /> */}
      <DisplayFormulas />
    </div>
  );
};

export default Formulas;
