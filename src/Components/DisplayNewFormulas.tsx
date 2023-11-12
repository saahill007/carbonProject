import { useEffect, useState } from "react";

import "./DisplayFormulas.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { apiUrlBase } from "../config";
import { ChoiceTypeAns } from "./ChoiceTypeAns";
interface Formula {
  formulaName: string;
  var1: string;
  var2: string;
  var3: string;
  var4: string;
}
interface Variable {
  name: string;
  value: number;
}
const DisplayNewFormulas = () => {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormula, setSelectedFormula] = useState<string>("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Formula[]>(`${apiUrlBase}/formulas`);
        setFormulas(response.data);
      } catch (error) {
        console.error("Error fetching formulas:", error);
      }
    };

    fetchData();
  }, []);

  const [variables, setVariables] = useState<Variable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ [key: string]: number }>(
          `${apiUrlBase}/api/getvardata`
        );

        // Convert the object to an array of objects
        const variablesArray = Object.entries(response.data).map(
          ([name, value]) => ({ name, value })
        );

        setVariables(variablesArray);
      } catch (error) {
        console.error("Error fetching variable data:", error);
      }
    };

    fetchData();
  }, []);
  const handleEdit = (name: string, value: string) => {
    // Find the variable in the state
    const updatedVariables = [...variables]; // Create a copy of the array to avoid mutating the state directly
    const variableIndex = updatedVariables.findIndex((va) => va.name === name);

    // If the variable is found, update its value
    if (variableIndex !== -1) {
      updatedVariables[variableIndex] = {
        ...updatedVariables[variableIndex],
        value: parseFloat(value), // Assuming the value is numeric
      };

      // Update the state with the new array
      setVariables(updatedVariables);
    }
  };

  const handleSave = async () => {
    // Make an API call to save all the variables
    try {
      await axios.post(`${apiUrlBase}/api/savevariables`, {
        variables: variables,
      });
      console.log("Variables saved successfully!");
      handleShowModal();
    } catch (error) {
      console.error("Error saving variables:", error);
    }
  };

  const calculateFormula = async (formulaName) => {
    // Make an API call to calculate the formula
    try {
      const response = await axios.post(`${apiUrlBase}/api/calculateFormula`, {
        formulaName,
      });

      // Get the result from the response
      const result = response.data.result;

      console.log(
        `Formula "${formulaName}" calculated successfully! Result:`,
        result
      );

      // You can do further processing with the result if needed
    } catch (error) {
      console.error(`Error calculating formula "${formulaName}":`, error);
    }
  };
  return (
    <>
      {formulas
        .filter((formula) => formula.formulaName === selectedFormula)
        .map((f, index) => (
          // Render each filtered formula here
          <>
            <div
              className="container"
              key={index}
              style={{ paddingRight: "80px", paddingLeft: "80px" }}
            >
              {/* <button
              onClick={() => console.log(calculateFormula(f.formulaName + " "))}
            >
              click
            </button> */}
              <div
                className="formula"
                style={{
                  fontSize: "20px",
                  paddingRight: "50px",
                  paddingBottom: "50px",
                  paddingTop: "50px",
                }}
              >
                <div className="row d-flex align-items-center">
                  <div className="col text-center"></div>
                  <div className="col text-center"></div>
                  <div className="col text-center"></div>
                  <div className="col text-center"></div>
                  <div className="col text-center">
                    {!isNaN(parseFloat(f.var1)) ? (
                      <div>
                        <div>{f.var1}</div>
                      </div>
                    ) : (
                      <div
                        className="cont"
                        style={{
                          borderRadius: "10px",
                        }}
                      >
                        <div className="row">
                          <button
                            type="button"
                            className="btn btn-info "
                            onClick={() => console.log()}
                          >
                            {f.var1}
                          </button>
                        </div>

                        <div className="row no-gutters">
                          <div className="col" style={{ padding: "0px 0px" }}>
                            <input
                              type="number"
                              className="form-control rounded"
                              value={
                                variables.find((va) => va.name === f.var1)
                                  ?.value || "1"
                              }
                              style={{ height: "37px" }}
                              onChange={(e) =>
                                handleEdit(f.var1, e.target.value)
                              }
                            />
                          </div>
                          <div className="col" style={{ padding: "0px 0px" }}>
                            <button
                              type="button"
                              className="form-control"
                              onClick={handleSave}
                              style={{ background: "#FF5701", height: "37px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col text-center"></div>
                  <div className="col text-center">
                    {!isNaN(parseFloat(f.var2)) ? (
                      <div>
                        <div>{f.var2}</div>
                      </div>
                    ) : (
                      <div
                        className="cont"
                        style={{
                          borderRadius: "10px",
                          paddingTop: "0px",
                          marginTop: "10px",
                          width: "100%",
                        }}
                      >
                        <div className="row">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => console.log()}
                          >
                            {f.var2}
                          </button>
                        </div>

                        <div className="row" style={{ padding: "0px 0px" }}>
                          <div className="col">
                            <input
                              type="number"
                              className="form-control rounded"
                              value={
                                variables.find((va) => va.name === f.var2)
                                  ?.value || "1"
                              }
                              style={{ height: "37px" }}
                              onChange={(e) =>
                                handleEdit(f.var2, e.target.value)
                              }
                            />
                          </div>
                          <div className="col" style={{ padding: "0px 0px" }}>
                            <button
                              type="button"
                              className="form-control"
                              onClick={handleSave}
                              style={{ background: "#FF5701", height: "37px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row d-flex align-items-center">
                  <div className="col text-center">
                    <button
                      className="btn btn-danger"
                      style={{
                        background: "white",
                        color: "black",
                        border: "3px solid black",
                      }}
                    >
                      {f.formulaName}
                    </button>
                  </div>
                  <div className="col text-center" style={{ fontSize: "30px" }}>
                    =
                  </div>
                  <div className="col text-center" style={{ width: "20px" }}>
                    User Input
                  </div>
                  <div className="col text-center">
                    <i
                      className="bi bi-x"
                      style={{ fontSize: 60, width: "40px" }}
                    ></i>
                  </div>
                  <div className="col text-center horizontal-line"></div>

                  <div className="col text-center">
                    <i
                      className="bi bi-x"
                      style={{ fontSize: 60, width: "40px" }}
                    ></i>
                  </div>
                  <div className="col text-center horizontal-line"></div>
                </div>
                <div className="row d-flex align-items-center">
                  <div className="col caption"></div>
                  <div className="col"></div>
                  <div className="col "></div>
                  <div className="col"></div>

                  <div
                    className="col text-center "
                    //   style={{ background: "#ede8e8", borderRadius: "10px" }}
                  >
                    {!isNaN(parseFloat(f.var3)) ? (
                      <div>
                        <div>{f.var3}</div>
                      </div>
                    ) : (
                      <div
                        className="cont"
                        style={{
                          borderRadius: "10px",
                          paddingTop: "0px",
                          marginTop: "10px",
                          width: "100%",
                        }}
                      >
                        <div className="row">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => console.log()}
                          >
                            {f.var3}
                          </button>
                        </div>

                        <div className="row">
                          <div className="col" style={{ padding: "0px 0px" }}>
                            <input
                              type="number"
                              className="form-control rounded"
                              value={
                                variables.find((va) => va.name === f.var3)
                                  ?.value || "1"
                              }
                              style={{ height: "37px" }}
                              onChange={(e) =>
                                handleEdit(f.var3, e.target.value)
                              }
                            />
                          </div>
                          <div className="col" style={{ padding: "0px 0px" }}>
                            <button
                              type="button"
                              className="form-control"
                              onClick={handleSave}
                              style={{ background: "#FF5701", height: "37px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col"></div>
                  <div
                    className="col text-center"
                    //   style={{ background: "#ede8e8", borderRadius: "10px" }}
                  >
                    {!isNaN(parseFloat(f.var4)) ? (
                      <div>
                        <div>{f.var4}</div>
                      </div>
                    ) : (
                      <div
                        className="cont"
                        style={{
                          borderRadius: "10px",
                          paddingTop: "0px",
                          marginTop: "10px",
                          width: "100%",
                        }}
                      >
                        <div className="row">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => console.log()}
                          >
                            {f.var4}
                          </button>
                        </div>

                        <div className="row">
                          <div className="col" style={{ padding: "0px 0px" }}>
                            <input
                              type="number"
                              className="form-control rounded"
                              value={
                                variables.find((va) => va.name === f.var4)
                                  ?.value || "1"
                              }
                              style={{ height: "37px" }}
                              onChange={(e) =>
                                handleEdit(f.var4, e.target.value)
                              }
                            />
                          </div>
                          <div className="col" style={{ padding: "0px 0px" }}>
                            <button
                              type="button"
                              className="form-control"
                              onClick={handleSave}
                              style={{ background: "#FF5701", height: "37px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <button onClick={() => console.log(calculateFormula(f.formulaName))}>
            Click
          </button> */}
          </>
        ))}

      <div style={{ width: "50%", paddingTop: "100px", margin: "0 auto" }}>
        {/* <h2>Formula Table</h2> */}
        <table className="table table-bordered">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Formula Name</th>
              <th>View Formula</th>
            </tr>
          </thead>
          <tbody>
            {formulas.map((formula) => (
              <tr key={formula.formulaName}>
                <td style={{ textAlign: "center", paddingTop: "20px" }}>
                  {formula.formulaName}
                </td>
                <td style={{ margin: "0 auto", alignItems: "center" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedFormula(formula.formulaName);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    style={{ width: "100%" }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Save Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Variables have been saved successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayNewFormulas;
