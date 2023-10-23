import React, { useState, useEffect } from "react";
import Choice from "./Choice";

const NewFormula = () => {
  const [variables, updateVariables] = useState<string[]>([]);
  const [selectedVariable1, setSelectedVariable1] = useState<string | null>(
    null
  );
  const [selectedVariable2, setSelectedVariable2] = useState<string | null>(
    null
  );
  const [selectedVariable3, setSelectedVariable3] = useState<string | null>(
    null
  );
  const [selectedVariable4, setSelectedVariable4] = useState<string | null>(
    null
  );

  const [newFormula, setNewFormula] = useState<string>("");
  const [newVar, updateVar] = useState<string>("");
  const [newVal, updateVal] = useState<number>(1);

  const getVarValues = (variableName: string, value: number) => {
    console.log(variableName);
    updateVal(value);
    updateVar(variableName);
    console.log(value);
  };

  useEffect(() => {
    // Fetch variables from the server when the component mounts
    fetchVariables();
  }, []);

  const fetchVariables = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/getvardata");
      const data = await response.json();
      const variableNames = Object.keys(data);
      updateVariables(variableNames);
    } catch (error) {
      console.error("Error fetching variables:", error);
    }
  };
  const handleAddVariable = async (e: React.MouseEvent) => {
    // e.preventDefault();

    // try {
    //   if (typeof newVar !== "string" || !newVar.trim()) {
    //     console.error("Variable name must be a non-empty string");
    //     return;
    //   }

    //   const response = await fetch("http://localhost:3001/api/addConversion", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       variableName: newVar,
    //       variableValue: newVal,
    //     }),
    //   });

    //   if (response.ok) {
    //     console.log("Variable added successfully!");
    //     updateVar("");
    //     updateVal(1);
    //   } else {
    //     console.error(`Error adding variable: ${response.statusText}`);
    //   }
    // } catch (error) {
    //   console.error("Error adding variable:", error);
    // }
    try {
      // Ensure that selected variables are either the selected value or "1" if null
      const var1 = newVar;
      const val1 = newVal;

      // Your API endpoint for adding a new formula
      const response = await fetch("http://localhost:3001/api/addConversion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newVar,
          value: newVal,
        }),
      });

      if (response.ok) {
        console.log("Variable saved successfully!");
        // Reset state variables
        fetchVariables();
        updateVar("");
        updateVal(1);
      } else {
        console.error("Failed to save var.");
      }
    } catch (error) {
      console.error("Error saving var:", error);
    }
  };

  const handleSaveFormula = async () => {
    try {
      // Ensure that selected variables are either the selected value or "1" if null
      const var1 = selectedVariable1 || "1";
      const var2 = selectedVariable2 || "1";
      const var3 = selectedVariable3 || "1";
      const var4 = selectedVariable4 || "1";

      // Your API endpoint for adding a new formula
      const response = await fetch("http://localhost:3001/api/addFormula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formulaName: newFormula,
          var1,
          var2,
          var3,
          var4,
        }),
      });

      if (response.ok) {
        console.log("Formula saved successfully!");
        // Reset state variables
        setNewFormula("");
        setSelectedVariable1(null);
        setSelectedVariable2(null);
        setSelectedVariable3(null);
        setSelectedVariable4(null);
      } else {
        console.error("Failed to save formula.");
      }
    } catch (error) {
      console.error("Error saving formula:", error);
    }
  };

  return (
    <div>
      <div
        className="newFormula"
        style={{
          marginLeft: "10%",
          marginRight: "10%",
          backgroundColor: "#faf7f7",
          marginTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          marginBottom: "20px",
          paddingBottom: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="row d-flex align-items-center">
          <p
            style={{
              fontFamily: "Outfit-SemiBold, Helvetica",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "30px",
              marginLeft: "20px",
            }}
          >
            (Create a new formula for using above)
          </p>
          <div className="col">
            <div style={{ width: "200px" }}>
              <input
                className="form-control rounded"
                type="text"
                placeholder="NewFormula"
                value={newFormula}
                onChange={(e) => setNewFormula(e.target.value)}
              />
            </div>
          </div>
          <div className="col text-center" style={{ width: 20 }}>
            =
          </div>
          <div className="col text-center">User Input</div>
          <div className="col text-center" style={{ width: 20 }}>
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            <select
              className="form-select"
              value={selectedVariable1 || ""}
              onChange={(e) => setSelectedVariable1(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="" disabled>
                Select Variable
              </option>
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </div>
          <div className="col text-center" style={{ width: 20 }}>
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            <select
              className="form-select"
              value={selectedVariable2 || ""}
              onChange={(e) => setSelectedVariable2(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="" disabled>
                Select Variable
              </option>
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col"> </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            <select
              className="form-select"
              value={selectedVariable3 || ""}
              onChange={(e) => setSelectedVariable3(e.target.value)}
              style={{ width: "200px", marginTop: "10px", marginLeft: "30px" }}
            >
              <option value="" disabled>
                Select Variable
              </option>
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </div>
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            <select
              className="form-select"
              value={selectedVariable4 || ""}
              onChange={(e) => setSelectedVariable4(e.target.value)}
              style={{ width: "200px", marginTop: "10px" }}
            >
              <option value="" disabled>
                Select Variable
              </option>
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row d-flex align-items-center">
          <p
            style={{
              fontFamily: "Outfit-SemiBold, Helvetica",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "30px",
              marginLeft: "20px",
            }}
          >
            (Add a new variable for using in the formula above)
          </p>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control rounded"
                placeholder="Variable Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateVar(e.target.value);
                }}
              ></input>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control rounded"
                placeholder="Variable Value"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = parseFloat(e.target.value);
                  updateVal(newValue);
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
                Add Variable
              </button>
            </div>
          </div>
          {/* <div className="col-md">
            <Choice onValuesChange={getVarValues} />
          </div> */}
        </div>

        <div className="row d-flex align-items-center">
          <div className="col-md text-center">
            <button
              className="btn btn-primary"
              onClick={handleSaveFormula}
              style={{
                width: "400px",
                marginTop: "30px",
                backgroundColor: "#84D2F3",
                borderBlockColor: "#84D2F3",
              }}
            >
              Save Formula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFormula;
