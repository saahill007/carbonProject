import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Utilities_add.css";
// import axios from "axios";
// import addImg from "../assets/add.png";
// import delImg from "../assets/delete.png";
// import editImg from "../assets/edit.png";
import axiosInstance from '../axiosconfig';
import axios from "axios";
import { apiUrlBase } from "../config";

interface Utility {
  Zipcode: string;
  Country: string;
  City: string;
  Utility: string;
  Utility_Value: string;
  Utility_Units: string;
  // Carbon_Intensity: string;
  // Carbon_Intensity_Unit: string;
  // Ref_Value: string;
  Sources: string;
  Date_of_Source: string;
  utility_name: string;
  utility_id: number;
  utility_units: string;
}

interface Country {
  country_id: number;
  country_name: string;
}


const Utilities_add: React.FC = () => {
  const [data, setData] = useState<Utility[]>([]);
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedUtility, setSelectedUtility] = useState<string>("");

  const [newUtility, setNewUtility] = useState<Utility>({
    Zipcode: "",
    Country: "United States",
    City: "",
    Utility: "",
    Utility_Value: "",
    Utility_Units: "",
    // Carbon_Intensity: "",
    // Carbon_Intensity_Unit: "",
    // Ref_Value: "",
    Sources: "",
    Date_of_Source: "",
    utility_name:"",
    utility_id:0,
    utility_units:"",
  });
  const [error, setError] = useState<string>(""); // To track and display error message
  const [SuccessMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleUtility = () => {
    navigate("/values/utilities");
  };

  const fetchCountries = async () => {
    try {
      const response = await axiosInstance.get<Country[]>(
        "/api/country_list"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get<Utility[]>(
        `${apiUrlBase}/api/utility_add`
      );
      console.log("Response data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 

  const fetchUtilities = async () => {
    try {
      const response = await axios.get<Utility[]>(`${apiUrlBase}/api/utility_list`);
      setUtilities(response.data);
    } catch (error) {
      console.error("Error fetching utilities:", error);
    }
  };

  


  const handleSave = async () => {
    // if any of the feild is empty
    if (
      !newUtility.Zipcode ||
      !newUtility.Country ||
      !newUtility.City ||
      !newUtility.Utility ||
      !newUtility.Utility_Value ||
      !newUtility.Utility_Units ||
      !newUtility.Sources ||
      !newUtility.Date_of_Source
    ) {
      setError("Some of the fields are empty. Please fill in all the details.");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    const existingUtility = data.find(
      (utility) =>
        utility.Zipcode === newUtility.Zipcode &&
        utility.Utility === newUtility.Utility &&
        utility.Utility_Units === newUtility.Utility_Units
    );

    if (!existingUtility) {
      try {
        // Send the newUtility data to your server for saving
        const response = await axios.post(
          `${apiUrlBase}/api/new_utilities_add`,
          newUtility
        );
        console.log("Data saved:", response.data);

        // If the data is successfully saved, reset the newUtility state to an empty template
        setNewUtility({
          Zipcode: "",
          Country: "United States",
          City: "",
          Utility: "",
          Utility_Value: "",
          Utility_Units: "",
          // Carbon_Intensity: "",
          // Carbon_Intensity_Unit: "",
          // Ref_Value: "",
          Sources: "",
          Date_of_Source: "",
          utility_name:"",
          utility_id:0,
          utility_units:""
        });

        // Reset the error message
        setError("");
        setSuccessMessage("Data saved successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);

        // Fetch the updated data
        fetchData();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setError(
        "The combination of Zipcode, Utility, and Utility Units already exists. Please use a different combination."
      );
      return;
    }
  };

  useEffect(() => {
    fetchData();
    fetchUtilities();
    fetchCountries(); // Add this line
  }, []);
  

  return (
    <div
      className="Utilities"
      style={{ paddingLeft: "100px", paddingTop: "70px" }}
    >
      <div className="Admin">
        <div className="Admin_Details">Add new utility below:</div>
      </div>
      <div className="tables-wrapper">
        <table className="tabls-space">
          <thead>
            <tr className="bg-info sticky-header">
              <th>Zipcode</th>
              <th>Country</th>
              <th>City</th>
              <th>Utility</th>
              <th>Utility Value</th>
              <th>Utility Units</th>
              {/* <th>Carbon Intensity</th>
                        <th>Carbon Intensity Unit</th>
                        <th>Reference Value</th> */}
              <th>Sources</th>
              <th>Date of Source</th>
            </tr>
          </thead>
          <tbody id="myTable">
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Zipcode"
                  value={newUtility.Zipcode}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setNewUtility({ ...newUtility, Zipcode: e.target.value });
                    }
                  }}
                />
              </td>
              <td>
                <select
                  value={newUtility.Country}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, Country: e.target.value })
                  }
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_name}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="City"
                  value={newUtility.City}
                  onChange={(e) => {
                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                      setNewUtility({ ...newUtility, City: e.target.value });
                    }
                  }}
                />
              </td>
              <td>
              <select
                  value={newUtility.Utility}
                  onChange={(e) => {
                    const selectedUtility = e.target.value;
                    setNewUtility({
                      ...newUtility,
                      Utility: selectedUtility,
                      Utility_Units: utilities.find(
                        (utility) => utility.utility_name === selectedUtility
                      )?.utility_units || "", // Set Utility_Units based on the selected Utility
                    });
                    setSelectedUtility(selectedUtility);
                  }}
                >
                  <option value="">Select Utility</option>
                  {utilities.map((utility) => (
                    <option key={utility.utility_id} value={utility.utility_name}>
                      {utility.utility_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Utility Value"
                  value={newUtility.Utility_Value}
                  onChange={(e) =>
                    setNewUtility({
                      ...newUtility,
                      Utility_Value: e.target.value,
                    })
                  }
                />
              </td>
              <td>
              <select
                  value={newUtility.Utility_Units}
                  onChange={(e) =>
                    setNewUtility({
                      ...newUtility,
                      Utility_Units: e.target.value,
                    })
                  }
                >
                  <option value="">Select Utility Unit</option>
                  {utilities
                    .filter((utility) => utility.utility_name === selectedUtility)
                    .map((utility) => (
                      <option
                        key={utility.utility_id}
                        value={utility.utility_units}
                      >
                        {utility.utility_units}
                      </option>
                    ))}
                </select>
              </td>
              {/* <td>
                            <input
                                type="text"
                                placeholder="Carbon Intensity"
                                value={newUtility.Carbon_Intensity}
                                onChange={(e) => setNewUtility({ ...newUtility, Carbon_Intensity: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Carbon Intensity Unit"
                                value={newUtility.Carbon_Intensity_Unit}
                                onChange={(e) => setNewUtility({ ...newUtility, Carbon_Intensity_Unit: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Reference Value"
                                value={newUtility.Ref_Value}
                                onChange={(e) => setNewUtility({ ...newUtility, Ref_Value: e.target.value })}
                            />
                        </td> */}
              <td>
                <input
                  type="text"
                  placeholder="Sources"
                  value={newUtility.Sources}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, Sources: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Date of Source"
                  value={newUtility.Date_of_Source}
                  onChange={(e) =>
                    setNewUtility({
                      ...newUtility,
                      Date_of_Source: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {error && <div className="error-message">{error}</div>}
      {SuccessMessage && (
        <div className="success-message">{SuccessMessage}</div>
      )}

      <button className="back_option" onClick={handleUtility}>
        Back
      </button>
      <button className="save" onClick={handleSave}>
        Save
      </button>

      {/* <div className="bottom-border"></div> */}
    </div>
  );
};

export default Utilities_add;
