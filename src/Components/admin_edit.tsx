import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./admin_edit.css"; // Import your CSS file
// import axios from "axios";
import axiosInstance from "./axiosconfig";

interface Admin {
  admin_id: number;
  Name: string;
  Email: string;
}

const AdminEdit: React.FC = () => {
  const { adminIds } = useParams<{ adminIds?: string }>();
  const adminIdArray = adminIds ? adminIds.split(",") : [];
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [editAdmin, setEditAdmin] = useState<Admin>({
    admin_id: 0, // Provide a default value or the appropriate data type for admin_id
    Name: "",
    Email: "",
  });

  useEffect(() => {
    // Function to fetch admin data
    const fetchAdminData = async () => {
      // Loop through adminIdArray and fetch data for each admin ID
      const adminDataPromises = adminIdArray.map(async (adminId) => {
        try {
          const response = await axiosInstance.get(`/api/admin/${adminId}`); // Replace with your API endpoint
          return response.data; // Assuming the response contains the admin data
        } catch (error) {
          console.error(
            `Error fetching admin data for admin ID ${adminId}:`,
            error
          );
          return null; // Handle errors gracefully
        }
      });
      // Wait for all requests to complete
      const adminDataResults = await Promise.all(adminDataPromises);
      // Filter out any null values (failed requests)
      const filteredAdminData = adminDataResults.filter(
        (data) => data !== null
      );
      // Update the state with the fetched data
      setAdminData(filteredAdminData);
    };
    // Fetch data when the component mounts
    fetchAdminData();
  }, [adminIdArray]); // Re-fetch data when adminIdArray changes

  const handleEdit = (admin: Admin) => {
    setEditAdmin(admin);
  };

  const handleSave = async () => {
    // Check if the email is in a valid format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(editAdmin.Email)) {
      setErrorMessage(
        "Email is not in a valid format. Please use a valid email address."
      );
      return;
    }
    if (editAdmin && editAdmin.Name && editAdmin.Email) {
      try {
        // Send a POST request to your API endpoint for updating admin data
        await axiosInstance.post(`/api/update_admin/${editAdmin.admin_id}`, {
          Name: `${editAdmin.Name}`, // Enclose in backticks to ensure it's treated as a string
          Email: `${editAdmin.Email}`, // Enclose in backticks to ensure it's treated as a string
        });

        // Clear the editAdmin state
        // setEditAdmin(null);

        // Update the state with the saved data
        setAdminData((prevAdminData) =>
          prevAdminData.map((admin) =>
            admin.admin_id === editAdmin.admin_id ? editAdmin : admin
          )
        );

        console.log("Admin data saved successfully!");
      } catch (error) {
        console.error("Error saving admin data:", error);
      }
    } else {
      // Handle the case where either Name or Email is empty
      setErrorMessage(
        "Name and Email fields cannot be empty. Please fill them in."
      );
    }
  };

  const handleadmin = () => {
    navigate("/values/admin");
  };

  return (
    <div
      className="admin-edit-container"
      style={{ paddingLeft: "100px", paddingTop: "70px" }}
    >
      <div className="admin-edit-header">
        <h2 className="edit-title">Edit Admin</h2>
      </div>
      <div className="table-wrapper">
        <table className="table-space">
          <thead>
            <tr className="sticky-header">
              <th>Admin ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {adminData.map((admin) => (
              <tr key={admin.admin_id}>
                <td>{admin.admin_id}</td>
                <td>
                  {editAdmin?.admin_id === admin.admin_id ? (
                    <input
                      type="text"
                      placeholder={admin.Name}
                      value={editAdmin.Name}
                      onChange={(e) =>
                        setEditAdmin({ ...editAdmin, Name: e.target.value })
                      }
                    />
                  ) : (
                    admin.Name
                  )}
                </td>
                <td>
                  {editAdmin?.admin_id === admin.admin_id ? (
                    <input
                      type="text"
                      placeholder={admin.Email}
                      value={editAdmin.Email}
                      onChange={(e) =>
                        setEditAdmin({ ...editAdmin, Email: e.target.value })
                      }
                    />
                  ) : (
                    admin.Email
                  )}
                </td>
                <td>
                  {editAdmin?.admin_id === admin.admin_id ? (
                    <button className="savebutton" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button className="edit" onClick={() => handleEdit(admin)}>
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

      <button className="back" onClick={handleadmin}>
        Back
      </button>
      <div className="bottom-border"></div>
    </div>
  );
};

export default AdminEdit;
