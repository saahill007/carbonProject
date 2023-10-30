// UtilitiesManager.tsx
import React, { useState, useEffect } from "react";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UtilitiesManager.css";
import axiosInstance from './axiosconfig';


interface Utility {
  id: number;
  name: string;
  reference: string;
  city: string;
  zipCode: string;
  disabled: boolean;
}

interface UtilitiesManagerProps {
  // Any props you might need
}

const UtilitiesManager: React.FC<UtilitiesManagerProps> = () => {
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [newUtility, setNewUtility] = useState({
    name: "",
    reference: "",
    city: "",
    zipCode: "",
  });
  const [editUtility, setEditUtility] = useState<Utility | null>(null);

  useEffect(() => {
    fetchUtilities();
  }, []);

  const fetchUtilities = async () => {
    try {
      const response = await axiosInstance.get("/api/utilities");
      setUtilities(response.data);
    } catch (error) {
      console.error("Error fetching utilities:", error);
    }
  };

  const handleAddUtility = async () => {
    try {
      await axiosInstance.post("/api/addUtility", newUtility);
      await fetchUtilities();
      setNewUtility({ name: "", reference: "", city: "", zipCode: "" });
    } catch (error) {
      console.error("Error adding utility:", error);
    }
  };
  const handleUpdateUtility = async (id: number, disabled: boolean) => {
    try {
      // Send a PUT request to update the utility's disabled status
      await axiosInstance.put(`/api/updateUtility/${id}`, {
        disabled,
        // Include the other properties as needed
        name: editUtility?.name,
        reference: editUtility?.reference,
        city: editUtility?.city,
        zipCode: editUtility?.zipCode,
      });

      // Update the local utilities state to reflect the changes
      setUtilities((prevUtilities) => {
        return prevUtilities.map((utility) => {
          if (utility.id === id) {
            return { ...utility, disabled };
          }
          return utility;
        });
      });
    } catch (error) {
      console.error("Error updating utility:", error);
    }
  };

  // Modify the handleUpdateUtility function
  //   const handleUpdateUtility = async (id: number, disabled: boolean) => {
  //     try {
  //       await axios.put(`http://localhost:3001/api/updateUtility/${id}`, {
  //         disabled,
  //         name: editUtility?.name,
  //         reference: editUtility?.reference,
  //         city: editUtility?.city,
  //         zipCode: editUtility?.zipCode,
  //       });

  //       // Update the local utilities state to reflect the changes
  //       setUtilities((prevUtilities) => {
  //         return prevUtilities.map((utility) => {
  //           if (utility.id === id) {
  //             return { ...utility, disabled };
  //           }
  //           return utility;
  //         });
  //       });
  //     } catch (error) {
  //       console.error("Error updating utility:", error);
  //     }
  //   };

  const handleEditUtility = (utility: Utility) => {
    setEditUtility(utility);
  };

  const handleSaveEdit = async () => {
    if (editUtility) {
      try {
        await axiosInstance.put(
          `/api/updateUtility/${editUtility.id}`,
          {
            name: editUtility.name,
            reference: editUtility.reference,
            city: editUtility.city,
            zipCode: editUtility.zipCode,
            disabled: editUtility.disabled,
          }
        );
        await fetchUtilities();
        setEditUtility(null);
      } catch (error) {
        console.error("Error saving edit:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditUtility(null);
  };

  return (
    <div>
      <div className="utilitiesHeading">Utilities Manager</div>
      <div className="container mt-4">
        <div className="UtilitiesManager">
          <div className="UtilitiesTable">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reference</th>
                  <th>City</th>
                  <th>Zip Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {utilities.map((utility) => (
                  <tr key={utility.id}>
                    <td>
                      {editUtility?.id === utility.id ? (
                        <input
                          className="form-control"
                          value={editUtility.name}
                          onChange={(e) =>
                            setEditUtility({
                              ...editUtility,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        utility.name
                      )}
                    </td>
                    <td>
                      {editUtility?.id === utility.id ? (
                        <input
                          className="form-control"
                          value={editUtility.reference}
                          onChange={(e) =>
                            setEditUtility({
                              ...editUtility,
                              reference: e.target.value,
                            })
                          }
                        />
                      ) : (
                        utility.reference
                      )}
                    </td>
                    <td>
                      {editUtility?.id === utility.id ? (
                        <input
                          className="form-control"
                          value={editUtility.city}
                          onChange={(e) =>
                            setEditUtility({
                              ...editUtility,
                              city: e.target.value,
                            })
                          }
                        />
                      ) : (
                        utility.city
                      )}
                    </td>
                    <td>
                      {editUtility?.id === utility.id ? (
                        <input
                          className="form-control"
                          value={editUtility.zipCode}
                          onChange={(e) =>
                            setEditUtility({
                              ...editUtility,
                              zipCode: e.target.value,
                            })
                          }
                        />
                      ) : (
                        utility.zipCode
                      )}
                    </td>

                    <td>
                      {editUtility?.id === utility.id ? (
                        <>
                          <div className="ActionsButtons">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={handleSaveEdit}
                              style={{
                                backgroundColor: "#9FC1A2",
                                border: "1px solid #9FC1A2",
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm ml-1"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="ActionsButtons">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEditUtility(utility)}
                              style={{
                                backgroundColor: "#5dbed9",
                                border: "1px solid #5dbed9",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className={`btn btn-${
                                utility.disabled ? "success" : "danger"
                              } btn-sm ml-1`}
                              onClick={() =>
                                handleUpdateUtility(
                                  utility.id,
                                  !utility.disabled
                                )
                              }
                              style={{
                                backgroundColor: utility.disabled
                                  ? "#9FC1A2"
                                  : "#d95d67",
                                border: utility.disabled
                                  ? "1px solid #64C064"
                                  : "1px solid #d95d67",
                              }}
                            >
                              {utility.disabled ? "Enable" : "Disable"}
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="AddNewUtilForm">
            <div className="row">
              <div className="col-md-12">
                <h2 className="headingUtil">Add New Utility</h2>
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={newUtility.name}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, name: e.target.value })
                  }
                />
                <label>Reference Value</label>
                <input
                  className="form-control"
                  type="text"
                  value={newUtility.reference}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, reference: e.target.value })
                  }
                />
                <label>City</label>
                <input
                  className="form-control"
                  type="text"
                  value={newUtility.city}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, city: e.target.value })
                  }
                />
                <label>Zip Code</label>
                <input
                  className="form-control"
                  type="text"
                  value={newUtility.zipCode}
                  onChange={(e) =>
                    setNewUtility({ ...newUtility, zipCode: e.target.value })
                  }
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAddUtility}
                  style={{
                    backgroundColor: "#9FC1A2",
                    //   border: "1px solid #9FC1A2",
                  }}
                >
                  Add Utility
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UtilitiesManager;
