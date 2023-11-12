import AddVar from "./AddVar";
import Choice from "./Choice";
import { Desktop } from "./Desktop";
import DisplayFormulas from "./DisplayFormulas";
import DisplayNewFormulas from "./DisplayNewFormulas";
import NewFormula from "./NewFormula";
import Ques from "./Ques";
import QuestionAdmin from "./QuestionAdmin";
import RefValueSelector from "./RefValueSelector";
// import UnitsSelector from "./unitsSelector";

const Formulas = () => {
  return (
    <div className="content-beside-navbar">
    <div>
      {/* <UnitsSelector onSelectionChange={handleSelectionChange} />
      <Ques onQuestionChange={handleQuestionChange} />
      <Choice onValuesChange={handleValuesChange} />
      <RefValueSelector onSelect={handleValueSelect} onAdd={handleValueAdd} /> */}
      {/* <QuestionAdmin /> */}
      {/* <Desktop />
      {/* <Choice onValuesChange={handleValuesChange} /> */}
      {/* <DisplayFormulas /> */}
      <DisplayNewFormulas />
    </div>
    </div>
  );
};

export default Formulas;
