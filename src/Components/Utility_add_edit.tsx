import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axiosconfig";
import "./Utilities_add_edit.css";
import axios from "axios";
import { apiUrlBase } from "../config";

interface Utility {
  utility_id: number;
  utility_name: string;
  utility_units: string;
}

const Utility_add_edit: React.FC = () => {
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const navigate = useNavigate();
  const [newUtility, setNewUtility] = useState<Utility>({
    utility_id: 0,
    utility_name: "",
    utility_units: "",
  });
  const [editUtility, setEditUtility] = useState<Utility | null>(null);
  const [error, setError] = useState<string>("");
  const [adderror, setAddError] = useState<string>("");

  const handleutility = () => {
    navigate("/values/utilities");
  };

  const fetchUtilities = async () => {
    try {
      const response = await axios.get<Utility[]>(`${apiUrlBase}/api/utility_list`);
      console.log("Utility List:", response.data);
      setUtilities(response.data);
    } catch (error) {
      console.error("Error fetching utility data:", error);
    }
  };

  useEffect(() => {
    fetchUtilities();
  }, []);

  const handleSave = async () => {
    try {

      if (!newUtility.utility_name || !newUtility.utility_units) {
        setAddError("Please fill in all fields.");
        setTimeout(() => {
          setAddError("");
        }, 1000);
        return;
      }
      // Send the new utility data to your server for saving
      const response = await axios.post(`${apiUrlBase}/api/new_utility_add`, {
        utility_name: newUtility.utility_name,
        utility_units: newUtility.utility_units,
      });

      console.log("Data saved:", response.data);

      // If the data is successfully saved, reset the newUtility state to an empty template
      setNewUtility({ utility_id: 0, utility_name: "", utility_units: "" });

      // Reset the error message
      setError("");

      // Fetch the updated data
      fetchUtilities();
    } catch (error) {
      console.error("Error saving utility data:", error);
      setError("Failed to save utility. Please try again.");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const handleEditSave = async () => {
    try {
      if (!editUtility?.utility_name || !editUtility?.utility_units) {
        setError("Please fill in all fields.");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }

      // Send a POST request to your API endpoint for updating utility data
      await axios.post(`${apiUrlBase}/api/update_utility_name/${editUtility?.utility_id}`, {
        utility_name: editUtility?.utility_name,
        utility_units: editUtility?.utility_units,
      });

      // Clear the editUtility state
      setEditUtility(null);

      // Fetch the updated data
      fetchUtilities();
    } catch (error) {
      console.error("Error saving utility data:", error);
    }
  };

  const handleEdit = (utility: Utility) => {
    setEditUtility(utility);
  };

  const handleDelete = async (utility_id: number) => {
    try {
      // Send a DELETE request to your API endpoint for deleting the utility
      await axios.delete(`${apiUrlBase}/api/delete_utility_name/${utility_id}`);

      // Fetch the updated data
      fetchUtilities();
    } catch (error) {
      console.error("Error deleting utility:", error);
    }
  };

  
  return (
    <div style={{ paddingLeft: "100px", paddingTop: "70px", paddingRight: "30px" }}>
      <div className="Utility">
        <div className="Utility_Details">View Existing Utilities:</div>
      </div>
      <div className="table-wrapper">
        <table className="tabl-space">
          <thead>
            <tr className="bg-info sticky-header">
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Units</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {utilities.map((utility) => (
              <tr key={utility.utility_id}>
                {/* <td>{utility.utility_id}</td> */}
                <td>
                  {editUtility?.utility_id === utility.utility_id ? (
                    <input
                      type="text"
                      placeholder={utility.utility_name}
                      value={editUtility.utility_name}
                      onChange={(e) =>
                        setEditUtility({
                          ...editUtility,
                          utility_name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    utility.utility_name
                  )}
                </td>
                <td>
                  {editUtility?.utility_id === utility.utility_id ? (
                    <input
                      type="text"
                      placeholder={utility.utility_units}
                      value={editUtility.utility_units}
                      onChange={(e) =>
                        setEditUtility({
                          ...editUtility,
                          utility_units: e.target.value,
                        })
                      }
                    />
                  ) : (
                    utility.utility_units
                  )}
                </td>
                <td>
                  {editUtility?.utility_id === utility.utility_id ? (
                    <>
                      <button className="savebutton" onClick={handleEditSave}>
                        Save
                      </button>
                      <button
                        className="deletebutton"
                        onClick={() => setEditUtility(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit" onClick={() => handleEdit(utility)}>
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(utility.utility_id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <div className="error-message">{error}</div>}
      <div className="Utility">
        <div className="Utility_Details">Add new utility below:</div>
      </div>
      <div className="table-wrapper">
        <table className="tabl-space">
          <thead>
            <tr className="bg-info sticky-header">
              <th>Name</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody id="myTable">
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUtility.utility_name}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, utility_name: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Units"
                  value={newUtility.utility_units}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, utility_units: e.target.value })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {adderror && <div className="error-message">{adderror}</div>}
      <button className="back_option" onClick={handleutility}>
        Back
      </button>
      <button className="save" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Utility_add_edit;
