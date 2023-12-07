import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Utility_edit.css";
// import axiosInstance from './axiosconfig';
import axios from "axios";
import { apiUrlBase } from "../config";

interface Utility {
  Val_Id: number;
  Zipcode: string;
  Country: string;
  City: string;
  Utility: string;
  Utility_Value: string;
  Utility_Units: string;
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

const UtilitiesEdit: React.FC = () => {
  const { utilityIds } = useParams<{ utilityIds?: string }>();
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const utilityIdArray = utilityIds ? utilityIds.split(",") : [];
  const [utilityData, setUtilityData] = useState<Utility[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [SuccessMessage, setSuccessMessage] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedUtility, setSelectedUtility] = useState<string>("");
  const navigate = useNavigate();
  const [editUtility, setEditUtility] = useState<Utility>({
    Val_Id: 0,
    Zipcode: "",
    Country: "",
    City: "",
    Utility: "",
    Utility_Value: "",
    Utility_Units: "",
    Sources: "",
    Date_of_Source: "",
    utility_name:"",
    utility_id:0,
    utility_units:""
  });

  useEffect(() => {
    const fetchUtilityData = async () => {
      const utilityDataPromises = utilityIdArray.map(async (utilityId) => {
        try {
          const response = await axios.get(
            `${apiUrlBase}/api/utility/${utilityId}`
          );
          return response.data;
        } catch (error) {
          console.error(
            `Error fetching utility data for utility ID ${utilityId}:`,
            error
          );
          return null;
        }
      });
      const utilityDataResults = await Promise.all(utilityDataPromises);
      const filteredUtilityData = utilityDataResults.filter(
        (data) => data !== null
      );
      setUtilityData(filteredUtilityData);
    };
    fetchUtilityData();
  }, [utilityIdArray]);

  const handleEdit = (utility: Utility) => {
    setEditUtility(utility);
  };

  const fetchUtilities = async () => {
    try {
      const response = await axios.get<Utility[]>(`${apiUrlBase}/api/utility_list`);
      setUtilities(response.data);
    } catch (error) {
      console.error("Error fetching utilities:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get<Country[]>(
        `${apiUrlBase}/api/country_list`
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchUtilities();
    fetchCountries();
  }, []);

  const handleSave = async () => {
    if (
      editUtility &&
      editUtility.Zipcode &&
      editUtility.Country &&
      editUtility.City &&
      editUtility.Utility &&
      editUtility.Utility_Value &&
      editUtility.Utility_Units &&
      editUtility.Sources &&
      editUtility.Date_of_Source
    ) {
      try {
        await axios.post(
          `${apiUrlBase}/api/update_utility/${editUtility.Val_Id}`,
          {
            Zipcode: `${editUtility.Zipcode}`,
            Country: `${editUtility.Country}`,
            City: `${editUtility.City}`,
            Utility: `${editUtility.Utility}`,
            Utility_Value: `${editUtility.Utility_Value}`,
            Utility_Units: `${editUtility.Utility_Units}`,
            Sources: `${editUtility.Sources}`,
            Date_of_Source: `${editUtility.Date_of_Source}`,
          }
        );

        setUtilityData((prevUtilityData) =>
          prevUtilityData.map((utility) =>
            utility.Val_Id === editUtility.Val_Id ? editUtility : utility
          )
        );
        setSuccessMessage("Utility data saved successfully!");
        setTimeout(() => {
          navigate("/values/utilities");
        }, 1500); // Adjust the delay time as needed
        console.log("Utility data saved successfully!");
      } catch (error) {
        console.error("Error saving utility data:", error);
      }
    } else {
      setErrorMessage("All fields are required. Please fill them in.");
      setTimeout(() => {
        setErrorMessage("")
      }, 1000); // Adjust the delay time as needed
    }
  };

  const handleUtility = () => {
    navigate("/values/utilities");
  };

  return (
    <div className="content-beside-navbar">
    <div
      className="utilities-edit-container"
      style={{ paddingLeft: "100px", paddingTop: "70px" }}
    >
      <div className="utilities-edit-header">
        <h2 className="edit-title">Edit Utility</h2>
      </div>
      <div className="tables-wrapper">
        <table className="table-space">
          <thead>
            <tr className="sticky-header">
              <th>Utility ID</th>
              <th>Zipcode</th>
              <th>Country</th>
              <th>City</th>
              <th>Utility</th>
              <th>Utility Value</th>
              <th>Utility Units</th>
              <th>Sources</th>
              <th>Date of Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {utilityData.map((utility) => (
              <tr key={utility.Val_Id}>
                <td>{utility.Val_Id}</td>
                <td>
                  {editUtility?.Val_Id === utility.Val_Id ? (
                    <input
                      type="text"
                      placeholder={utility.Zipcode}
                      value={editUtility.Zipcode}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === "" || re.test(e.target.value)) {
                          setEditUtility({
                            ...editUtility,
                            Zipcode: e.target.value,
                          });
                        }
                      }}
                    />
                  ) : (
                    utility.Zipcode
                  )}
                </td>
                <td>
                {editUtility?.Val_Id === utility.Val_Id ? (
                <select
                  value={editUtility.Country}
                  onChange={(e) =>
                    setEditUtility({ ...editUtility, Country: e.target.value })
                  }
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_name}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
                ) : (
                  utility.Country
                )}
              </td>
                <td>
                  {editUtility?.Val_Id === utility.Val_Id ? (
                    <input
                      type="text"
                      placeholder={utility.City}
                      value={editUtility.City}
                      onChange={(e) => {
                        const re = /^[a-zA-Z\s]*$/;
                        if (e.target.value === "" || re.test(e.target.value)) {
                          setEditUtility({
                            ...editUtility,
                            City: e.target.value,
                          });
                        }
                      }}
                    />
                  ) : (
                    utility.City
                  )}
                </td>
                <td>
              {editUtility?.Val_Id === utility.Val_Id ? (
                <select
                  value={editUtility.Utility}
                  onChange={(e) => {
                    const selectedUtility = e.target.value;
                    setEditUtility({
                      ...editUtility,
                      Utility: selectedUtility,
                      Utility_Units: utilities.find(
                        (utility) => utility.utility_name === selectedUtility
                      )?.utility_units || "", // Set Utility_Units based on the selected Utility
                    });
                    setSelectedUtility(selectedUtility);
                  }}
                  style={{ width: "5vw" }}
                >
                  <option value="">Select Utility</option>
                  {utilities.map((utility) => (
                    <option key={utility.utility_id} value={utility.utility_name}>
                      {utility.utility_name}
                    </option>
                  ))}
                </select>
              ) : (
                utility.Utility
              )}
            </td>
                <td>
                  {editUtility?.Val_Id === utility.Val_Id ? (
                    <input
                      type="text"
                      placeholder={utility.Utility_Value}
                      value={editUtility.Utility_Value}
                      onChange={(e) =>
                        setEditUtility({
                          ...editUtility,
                          Utility_Value: e.target.value,
                        })
                      }
                    />
                  ) : (
                    utility.Utility_Value
                  )}
                </td>
                <td>
              {editUtility?.Val_Id === utility.Val_Id ? (
                <select
                  value={editUtility.Utility_Units}
                  onChange={(e) =>
                    setEditUtility({
                      ...editUtility,
                      Utility_Units: e.target.value,
                    })
                  }
                  style={{ width: "5vw" }}
                >
                  <option value="">Select Utility Unit</option>
                  {utilities
                    .filter((utility) => utility.utility_name === editUtility.Utility)
                    .map((utility) => (
                      <option
                        key={utility.utility_id}
                        value={utility.utility_units}
                      >
                        {utility.utility_units}
                      </option>
                    ))}
                </select>
              ) : (
                utility.Utility_Units
              )}
            </td>

                <td>
                  {editUtility?.Val_Id === utility.Val_Id ? (
                    <input
                      type="text"
                      placeholder={utility.Sources}
                      value={editUtility.Sources}
                      onChange={(e) =>
                        setEditUtility({
                          ...editUtility,
                          Sources: e.target.value,
                        })
                      }
                    />
                  ) : (
                    utility.Sources
                  )}
                </td>
                <td>
                  {editUtility?.Val_Id === utility.Val_Id ? (
                    <input
                      type="text"
                      placeholder={utility.Date_of_Source}
                      value={editUtility.Date_of_Source}
                      onChange={(e) =>
                        setEditUtility({
                          ...editUtility,
                          Date_of_Source: e.target.value,
                        })
                      }
                    />
                  ) : (
                    utility.Date_of_Source
                  )}
                </td>
                <td>
                  {editUtility?.Val_Id === utility.Val_Id ? (
                    <button className="savebutton" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit"
                      onClick={() => handleEdit(utility)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {errorMessage && <div className="error_message">{errorMessage}</div>}
      {SuccessMessage && (
        <div className="success-message">{SuccessMessage}</div>
      )}

      <button className="back" onClick={handleUtility}>
        Back
      </button>
    </div>
    </div>
  );
};

export default UtilitiesEdit;
