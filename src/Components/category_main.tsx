import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./category_main.css";
// import axios from "axios";
import addImg from "../assets/add.png";
import delImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import axiosInstance from "../axiosconfig";

interface Category {
  category_id: number;
  category_name: string;
}

const Category_main: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [SuccessMessage, setSuccessMessage] = useState<string>("");

  const handleCategory = () => {
    navigate("/values");
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<Category[]>("/api/Category");
      console.log("Response data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = () => {
    if (selectedCategory.length > 0) {
      const categoryIdsQueryParam = selectedCategory.join(",");
      navigate(`/values/category/category_edit/${categoryIdsQueryParam}`);
    } else {
      console.error("No categories selected to edit.");
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

  const handleDeleteClick = async () => {
    if (selectedCategory.length > 0) {
      try {
        await axiosInstance.delete('/api/Category/delete', {
          data: { categoryIds: selectedCategory },
        });
        setSuccessMessage("Categories deleted successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
        setSelectedCategory([]);
        fetchData(); // Fetch updated data after deletion
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    } else {
      setErrorMessage("Select one or more categories to delete.");
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
      console.error("Select one or more utilities to delete.");
    }
  };

  const searchTable = (value: string, data: Category[]) => {
    const filteredData: Category[] = [];
    for (let i = 0; i < data.length; i++) {
      const Name = data[i].category_name.toLowerCase();
      if (Name.includes(value)) {
        filteredData.push(data[i]);
      }
    }
    return filteredData;
  };

  const handleCheckboxChange = (category_id: number) => {
    const index = selectedCategory.indexOf(category_id);
    if (index === -1) {
      setSelectedCategory([...selectedCategory, category_id]);
    } else {
      setSelectedCategory(selectedCategory.filter((id) => id !== category_id));
    }
  };

  return (
    <div className="content-beside-navbar">
    <div style={{ paddingLeft: "100px", paddingTop: "70px" }}>
      <div className="action">
        <div className="action-item">Action item:</div>
        <div className="modify">
          <a>
            <img
              className="CateImg"
              src={addImg}
              alt="add"
              onClick={() => navigate("/values/category/category_add")}
            />
          </a>
          <a href="#">
            <img
              className="CateImg"
              src={editImg}
              alt="edit"
              onClick={() => handleEditClick()}
            />
          </a>
          <a href="#">
              <img className="CateImg" src={delImg} alt="delete" onClick={() => handleDeleteClick()} />
          </a>
        </div>
      </div>

      <div className="Category_and_search">
        <div className="Category">Categories</div>
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
              <th>Category_id</th>
              <th>Category_Name</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {data.map((item) => (
              <tr key={item.category_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(item.category_id)}
                    onChange={() => handleCheckboxChange(item.category_id)}
                  />
                </td>
                <td>{item.category_id}</td>
                <td>{item.category_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errorMessage && <div className="error_message">{errorMessage}</div>}
      {SuccessMessage && <div className="success-message">{SuccessMessage}</div>}
      <button className="back" onClick={handleCategory}>
        Back
      </button>

      {/* <div className="bottom-border"></div> */}
    </div>
    </div>
  );
};

export default Category_main;
