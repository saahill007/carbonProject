import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin_main.css";
import "./admin_add.tsx";
import "./admin_edit.tsx";
// import axios from "axios";
import addImg from "../assets/add.png";
import delImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import axiosInstance from "../axiosconfig.js";

interface Admin {
  admin_id: number;
  Name: string;
  Email: string;
}

const Admin_main: React.FC = () => {
  const [data, setData] = useState<Admin[]>([]);
  //const [searchValue, setSearchValue] = useState<string>("");
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [SuccessMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  // const handlequestions = () => {
  //     navigate("/questions");
  // };

  const handleadmin = () => {
    navigate("/values");
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<Admin[]>("/api/admin_main");
      console.log("Response data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const searchInput = document.getElementById(
      "search-input"
    ) as HTMLInputElement | null;

    if (searchInput) {
      const value = searchInput.value.toLowerCase();
      const filteredData = searchTable(value, data);
      setData(filteredData);
    } else {
      console.error("Search input element not found");
    }
  };

  const searchTable = (value: string, data: Admin[]) => {
    const filteredData: Admin[] = [];
    for (let i = 0; i < data.length; i++) {
      const Name = data[i].Name.toLowerCase();
      if (Name.includes(value)) {
        filteredData.push(data[i]);
      }
    }
    return filteredData;
  };
  const handleCheckboxChange = (admin_id: number) => {
    const index = selectedAdmins.indexOf(admin_id);
    if (index === -1) {
      setSelectedAdmins([...selectedAdmins, admin_id]);
    } else {
      setSelectedAdmins(selectedAdmins.filter((id) => id !== admin_id));
    }
  };

  const handleDeleteClick = async () => {
    if (selectedAdmins.length > 0) {
      try {
        await axiosInstance.delete("/api/admins/delete", {
          data: { adminIds: selectedAdmins },
        });
        setSuccessMessage("Admin deleted successfully");
        setSelectedAdmins([]);
        fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    } else {
      console.error("Select one or more admins to delete.");
    }
  };

  const handleEditClick = () => {
    if (selectedAdmins.length > 0) {
      // Redirect to the edit page with selected admin IDs as query parameters
      const adminIdsQueryParam = selectedAdmins.join(",");
      navigate(`/values/admin/admin_edit/${adminIdsQueryParam}`);
    } else {
      console.error("Select one or more admins to edit.");
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-beside-navbar">
    <div style={{ paddingLeft: "100px", paddingTop: "70px" }}>
      <div className="action">
        <div className="action-item">Action item:</div>
        <div className="modify">
          <a>
            <img
              className="adminImg"
              src={addImg}
              alt="add"
              onClick={() => navigate("/values/admin/admin_add")}
            />
          </a>
          <a href="#">
            <img
              className="adminImg"
              src={editImg}
              alt="edit"
              onClick={() => handleEditClick()}
            />
          </a>
          <a href="#">
            <img
              className="adminImg"
              src={delImg}
              alt="delete"
              onClick={() => handleDeleteClick()}
            />
          </a>
        </div>
      </div>

      <div className="Admin_and_search">
        <div className="Admin_Details">Admin Details</div>
        <div className="search-container">
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="tabl-sapce">
          <thead>
            <tr className="bg-info sticky-header">
              <th>Select</th>
              <th>admin_id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {data.map((item) => (
              <tr key={item.admin_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAdmins.includes(item.admin_id)}
                    onChange={() => handleCheckboxChange(item.admin_id)}
                  />
                </td>
                <td>{item.admin_id}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {SuccessMessage && (
        <div className="success_message">{SuccessMessage}</div>
      )}
      <button className="back" onClick={handleadmin}>
        Back
      </button>

      {/* <div className="bottom-border"></div> */}
    </div>
    </div>
  );
};
export default Admin_main;
