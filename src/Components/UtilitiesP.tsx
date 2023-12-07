import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Utility.css";
// import axios from "axios";
import addImg from "../assets/add.png";
import delImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
// import axiosInstance from "./axiosconfig";
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
}

const Utilities: React.FC = () => {
    const [data, setData] = useState<Utility[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5); // Set the number of items per page here
    const [selectedUtilities, setSelectedUtilities] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [SuccessMessage, setSuccessMessage] = useState<string>("");
    const navigate = useNavigate();
  
    const fetchPaginatedData = async (page: number, limit: number) => {
      try {
        const response = await axios.get<Utility[]>(
          `${apiUrlBase}/api/utilities?page=${page}&limit=${limit}`
        );
        console.log("Response data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
        fetchPaginatedData(currentPage, itemsPerPage);
      }, [currentPage, itemsPerPage]);


    const handleadmin = () => {
        navigate("/values");
      };

      const handleDeleteClick = async () => {
        if (selectedUtilities.length > 0) {
          try {
            await axios.delete(`${apiUrlBase}/api/utilities/delete`, {
              data: { utilityIds: selectedUtilities },
            });
            setSuccessMessage("Select utilities deleted successfully");
            setTimeout(() => {
              setSuccessMessage("");
            }, 1000);
            setSelectedUtilities([]);
            fetchPaginatedData(currentPage, itemsPerPage); // Fetch updated data after deletion
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        } else {
          setErrorMessage("Select one or more utilities to delete.");
          setTimeout(() => {
            setErrorMessage("");
          }, 1000);
          console.error("Select one or more utilities to delete.");
        }
      };
    
      const handleCheckboxChange = (Val_Id: number) => {
        const index = selectedUtilities.indexOf(Val_Id);
        if (index === -1) {
          setSelectedUtilities([...selectedUtilities, Val_Id]);
        } else {
          setSelectedUtilities(selectedUtilities.filter((id) => id !== Val_Id));
        }
      };
    
      const handleEditClick = () => {
        if (selectedUtilities.length > 0) {
          // Redirect to the edit page with selected admin IDs as query parameters
          const utilityIdsQueryParam = selectedUtilities.join(",");
          navigate(`/values/utilities/utilities_edit/${utilityIdsQueryParam}`);
        } else {
          setErrorMessage("Select one or more utilities to edit.");
          setTimeout(() => {
            setErrorMessage("");
          }, 1000);
          console.error("Select one or more admins to edit.");
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
    
      const searchTable = (value: string, data: Utility[]) => {
        const filteredData: Utility[] = [];
        for (let i = 0; i < data.length; i++) {
          const Utility = data[i].Utility.toLowerCase();
          if (Utility.includes(value)) {
            filteredData.push(data[i]);
          }
        }
        return filteredData;
      };
    
      useEffect(() => {
        handleSearch();
      }, []);

      const totalPages = Math.ceil(data.length / itemsPerPage);

      
      const handleAddEditUtility = () => {
        navigate("/values/Utilities/Utility_add_edit");
      }

      return (
        <div className="content-beside-navbar">
        <div style={{ paddingLeft: "75px",paddingTop: "70px" }}>
          <div
          className="add-edit-utility-container"
          style={{ display: "flex", alignItems: "center", marginTop:"2.5vh" }}
        >
          {/* Button for adding or editing utility */}
          <button className="add-edit-utility-button" onClick={handleAddEditUtility}>
            Click
          </button>
          {/* Text beside the button */}
          <div className="add-edit-utility-text">
            to add or edit new utility
          </div>
        </div>
          <div className="action">
            <div className="action-item">Action item:</div>
            <div className="modify">
              <a href="#">
                <img
                  className="UtilImg"
                  src={addImg}
                  alt="add"
                  onClick={() => navigate("/values/Utilities/Utilities_add")}
                />
              </a>
              <a href="#">
                <img
                  className="UtilImg"
                  src={editImg}
                  alt="edit"
                  onClick={() => handleEditClick()}
                />
              </a>
              <a href="#">
                <img
                  className="UtilImg"
                  src={delImg}
                  alt="delete"
                  onClick={() => handleDeleteClick()}
                />
              </a>
            </div>
          </div>
      
          <div className="utilities-and-search">
            <div className="utilities">Utilities</div>
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
                  <th>Utility ID</th>
                  <th>Zipcode</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Utility</th>
                  <th>Utility Value</th>
                  <th>Utility_Units</th>
                  <th>Sources</th>
                  <th>Date of Source</th>
                </tr>
              </thead>
      
              <tbody id="myTable">
          {data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
              <tr key={item.Val_Id}>
                <td>
                <input
                type="checkbox"
                checked={selectedUtilities.includes(item.Val_Id)}
                onChange={() => handleCheckboxChange(item.Val_Id)}
                />
                </td>
                <td>{item.Val_Id}</td>
                <td>{item.Zipcode}</td>
                <td>{item.Country}</td>
                <td>{item.City}</td>
                <td>{item.Utility}</td>
                <td>{item.Utility_Value}</td>
                <td>{item.Utility_Units}</td>
                <td>{item.Sources}</td>
                <td>{item.Date_of_Source}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
        style={{
            backgroundColor: "black",
            width: "6vw",
            padding: "10px",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "7.5px",
          }}
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "5px 10px" }}>
          Page {currentPage} / {Math.ceil(data.length / itemsPerPage)}
        </span>
        <button
        style={{
            backgroundColor: "black",
            color: "white",
            width: "6vw",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "7.5px",
          }}
          onClick={() =>
            setCurrentPage(
              currentPage < Math.ceil(data.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
          {errorMessage && <div className="error_message">{errorMessage}</div>}
          {SuccessMessage && <div className="success-message">{SuccessMessage}</div>}
          <button className="back" onClick={handleadmin}>
            Back
          </button>
        </div>
        </div>
      );
    
}
export default Utilities;