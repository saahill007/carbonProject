import React, { useState, useEffect } from "react";
import "./DisplayFormulas.css";

interface VariableValues {
  co2PerGallonFuel: string;
  carMileage: string;
  co2Per1000cubicFtGas: string;
  pricePer1000cubicFtGas: string;
  co2PerThermsGas: string;
  co2PerKWHElec: string;
  pricePerKWHElec: string;
  pricePerGallonFuelOil: string;
  pricePerGallonPropane: string;
  co2PerGalloFuelOil: string;
  co2PerGallonPropane: string;
  // Add more variables as needed
}

const DisplayFormulas: React.FC = () => {
  const [variableValues, setVariableValues] = useState<VariableValues>({
    co2PerGallonFuel: "0",
    carMileage: "0",
    co2Per1000cubicFtGas: "0",
    pricePer1000cubicFtGas: "0",
    co2PerThermsGas: "0",
    co2PerKWHElec: "0",
    pricePerKWHElec: "0",
    pricePerGallonFuelOil: "0",
    pricePerGallonPropane: "0",
    co2PerGalloFuelOil: "0",
    co2PerGallonPropane: "0",
    // Add more variables as needed
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState<keyof VariableValues | null>(null);

  useEffect(() => {
    // Fetch initial values from the database
    fetchInitialValues();
  }, []); // Run only once when the component mounts

  const fetchInitialValues = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/getvardata`);
      const data = await response.json();

      setVariableValues(data); // Directly update the state with the received data
    } catch (error) {
      console.error("Error fetching initial values:", error);
    }
  };

  const handleVariableChange = (
    variableName: keyof VariableValues,
    value: string
  ) => {
    setVariableValues((prevValues) => ({
      ...prevValues,
      [variableName]: value,
    }));
  };

  const handleEdit = (id: keyof VariableValues) => {
    setIsEditing(true);
    setActiveId(id);
  };

  const handleSave = async (variableName: keyof VariableValues) => {
    try {
      // Make API call to save the variable value
      const response = await fetch(
        `http://localhost:3001/api/updatevar/${variableName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: parseFloat(variableValues[variableName]),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update ${variableName}`);
      }

      // Assuming the API returns the updated value
      const updatedData = await response.json();

      // Update the state with the received updated data
      setVariableValues((prevValues) => ({
        ...prevValues,
        [variableName]: updatedData.value.toString(),
      }));

      console.log(`Save ${variableName}: ${variableValues[variableName]}`);
    } catch (error) {
      console.error(`Error saving ${variableName} value:`, error);
    } finally {
      // Set isEditing back to false after saving
      setIsEditing(false);
    }
  };

  return (
    <div className="container">
      <h2 style={{ justifyContent: "space-between", fontSize: 28 }}>
        Conversion Formulas
      </h2>
      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">MilesPerWeekToC</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Miles / Week </div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerGallonFuel}
                  onChange={(e) =>
                    handleVariableChange("co2PerGallonFuel", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerGallonFuel")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerGallonFuel")}
              >
                Co2 Per Gallon Fuel
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">52</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts miles per week to Carbon footprints)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.carMileage}
                  onChange={(e) =>
                    handleVariableChange("carMileage", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("carMileage")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("carMileage")}
              >
                Car Mileage (Miles/Gallon)
              </button>
            )}
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">MilesPerYearToC</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Miles / Year </div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerGallonFuel}
                  onChange={(e) =>
                    handleVariableChange("co2PerGallonFuel", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerGallonFuel")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerGallonFuel")}
              >
                Co2 Per Gallon Fuel
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">1</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts miles per week to Carbon footprints)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.carMileage}
                  onChange={(e) =>
                    handleVariableChange("carMileage", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("carMileage")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("carMileage")}
              >
                Car Mileage (Miles/Gallon)
              </button>
            )}
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">DollarToCforGas</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Monthly Gas Bill</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2Per1000cubicFtGas}
                  onChange={(e) =>
                    handleVariableChange("co2Per1000cubicFtGas", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2Per1000cubicFtGas")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2Per1000cubicFtGas")}
              >
                Co2 Per 1000 cubic feet of Gas
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts dollars to Carbon footprints for Gas)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.pricePer1000cubicFtGas}
                  onChange={(e) =>
                    handleVariableChange(
                      "pricePer1000cubicFtGas",
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("pricePer1000cubicFtGas")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("pricePer1000cubicFtGas")}
              >
                Price / 1000 cubic feet of Gas
              </button>
            )}
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">CubicFtToCforGas</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Cubic Feet / month</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2Per1000cubicFtGas}
                  onChange={(e) =>
                    handleVariableChange("co2Per1000cubicFtGas", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2Per1000cubicFtGas")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2Per1000cubicFtGas")}
              >
                Co2 Per 1000 cubic feet of Gas
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts 1000 Cubic feet Gas to Carbon footprints)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">ThermsToCforGas</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Therms / Month</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerThermsGas}
                  onChange={(e) =>
                    handleVariableChange("co2PerThermsGas", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerThermsGas")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerThermsGas")}
              >
                Co2 Per Therms of Gas
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts Therms to Carbon footprints for Gas)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">DollarToCforElec</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Monthly Electricity Bill</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerKWHElec}
                  onChange={(e) =>
                    handleVariableChange("co2PerKWHElec", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerKWHElec")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerKWHElec")}
              >
                lbs of Co2 Per KWH of Electricity
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts dollars to Carbon footprints for Electricity)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.pricePerKWHElec}
                  onChange={(e) =>
                    handleVariableChange("pricePerKWHElec", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("pricePerKWHElec")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("pricePerKWHElec")}
              >
                Price / KWH of Electricity
              </button>
            )}
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">KWHToCforElec</div>
          <div className="col text-center">=</div>
          <div className="col text-center">KWH / Month</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerGalloFuelOil}
                  onChange={(e) =>
                    handleVariableChange("co2PerGalloFuelOil", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerGalloFuelOil")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerGalloFuelOil")}
              >
                Co2 Per Gallon of Fuel Oil
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts dollars to Carbon footprints for Gas)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.pricePerGallonFuelOil}
                  onChange={(e) =>
                    handleVariableChange(
                      "pricePerGallonFuelOil",
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("pricePerGallonFuelOil")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("pricePerGallonFuelOil")}
              >
                Price / Gallon of Fuel Oil
              </button>
            )}
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">GallonToCforFuelOil</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Gallon / Month</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerGalloFuelOil}
                  onChange={(e) =>
                    handleVariableChange("co2PerGalloFuelOil", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerGalloFuelOil")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerGalloFuelOil")}
              >
                Co2 Per Gallon of Fuel oil
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts Gallons to Carbon footprints for Fuel Oil)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">DollarToCforPropane</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Amount / Month</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerGallonPropane}
                  onChange={(e) =>
                    handleVariableChange("co2PerGallonPropane", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerGallonPropane")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerGallonPropane")}
              >
                Co2 Per Gallon of Propane
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts dollars to Carbon footprints for Propane)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center horizontal-line">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.pricePerGallonPropane}
                  onChange={(e) =>
                    handleVariableChange(
                      "pricePerGallonPropane",
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("pricePerGallonPropane")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("pricePerGallonPropane")}
              >
                Price / Gallon of Propane
              </button>
            )}
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="formula" style={{ fontSize: "20px" }}>
        <div className="row d-flex align-items-center">
          <div className="col text-center">GallonToCforPropane</div>
          <div className="col text-center">=</div>
          <div className="col text-center">Gallon / Month</div>
          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">
            {isEditing ? (
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={variableValues.co2PerGallonPropane}
                  onChange={(e) =>
                    handleVariableChange("co2PerGallonPropane", e.target.value)
                  }
                />

                <button
                  type="button"
                  className="form-control"
                  onClick={() => handleSave("co2PerGallonPropane")}
                >
                  Save
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleEdit("co2PerGallonPropane")}
              >
                Co2 Per Gallon of Propane
              </button>
            )}
          </div>

          <div className="col text-center">
            <i className="bi bi-x" style={{ fontSize: 40 }}></i>
          </div>
          <div className="col text-center">12</div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col caption">
            (converts Gallons to Carbon footprints for Propane)
          </div>
          {/* Add other elements as needed */}
          <div className="col"></div>
          <div className="col text-center"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default DisplayFormulas;
