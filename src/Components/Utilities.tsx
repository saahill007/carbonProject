import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Utility.css";
import axios from "axios";
import addImg from "../assets/add.png";
import delImg from "../assets/delete.png";
import editImg from "../assets/edit.png";

interface Utility {
  Val_Id: number;
  Zipcode: string;
  Country: string;
  City: string;
  Utility: string;
  Utility_Value: string;
  Utility_Units: string;
  Carbon_Intensity: string;
  Carbon_Intensity_Unit: string;
  Ref_Value: string;
  Sources: string;
  Date_of_Source: string;
}

const Utilities: React.FC = () => {
  const [data, setData] = useState<Utility[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const handlequestions = () => {
    navigate("/questions");
  };

  const handleadmin = () => {
    navigate("/values");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Utility[]>(
        "http://localhost:3000/api/Utility"
      );
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="action">
        <div className="action-item">Action item:</div>
        <div className="modify">
          <a href="#">
            <img className="UtilImg" src={addImg} alt="add" />
          </a>
          <a href="#">
            <img className="UtilImg" src={editImg} alt="edit" />
          </a>
          <a href="#">
            <img className="UtilImg" src={delImg} alt="delete" />
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
              <th>Val_Id</th>
              <th>Zipcode</th>
              <th>Country</th>
              <th>City</th>
              <th>Utility</th>
              <th>Utility Value</th>
              <th>Utility_Units</th>
              <th>Carbon Intensity</th>
              <th>Carbon Intensity_Unit</th>
              <th>Ref Value(lbs of Co2)</th>
              <th>Sources</th>
              <th>Date of Source</th>
            </tr>
          </thead>

          <tbody id="myTable">
            {data.map((item) => (
              <tr key={item.Val_Id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.Val_Id}</td>
                <td>{item.Zipcode}</td>
                <td>{item.Country}</td>
                <td>{item.City}</td>
                <td>{item.Utility}</td>
                <td>{item.Utility_Value}</td>
                <td>{item.Utility_Units}</td>
                <td>{item.Carbon_Intensity}</td>
                <td>{item.Carbon_Intensity_Unit}</td>
                <td>{item.Ref_Value}</td>
                <td>{item.Sources}</td>
                <td>{item.Date_of_Source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="back" onClick={handleadmin}>
        Back
      </button>

      <div className="bottom-border"></div>
    </div>
  );
};

export default Utilities;
