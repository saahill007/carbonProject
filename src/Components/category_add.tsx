import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./category_add.css";
import axios from "axios";
import addImg from "../assets/add.png";
import delImg from "../assets/delete.png";
import editImg from "../assets/edit.png";

interface Category {
    category_name: string;
}

const Category_add: React.FC = () => {
    const [data, setData] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<Category>({ category_name: "" });
    const [error, setError] = useState<string>(""); // To track and display error message
    const [SuccessMessage, setSuccessMessage] = useState<string>(""); // To track and display success message
    const navigate = useNavigate();

    const handlecategory = () => {
        navigate("/values/category");
    };

    const fetchData = async () => {
        try {
            const response = await axios.get<Category[]>(
                "http://localhost:3000/api/category_add"
            );
            console.log("Response data:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSave = async () => {
        const onlyLetters = /^[A-Za-z]+$/;
    
        if (!newCategory.category_name.match(onlyLetters)) {
            setError("Category name should only contain alphabets.");
            setTimeout(() => {
                setError("");
            }, 1000);
        } else {
            const lowerCaseData = data.map((category) => {
                return {
                    category_name: category.category_name.toLowerCase()
                };
            });
            const lowerCaseNewCategoryName = newCategory.category_name.toLowerCase();
    
            if (lowerCaseData.some((category) => category.category_name === lowerCaseNewCategoryName)) {
                setError("Entered category name already exists in the table.");
                setTimeout(() => {
                    setError("");
                }, 1000);
            } else {
                try {
                    const response = await axios.post("http://localhost:3000/api/new_add_category", {
                        category_name: newCategory.category_name
                    });
                    console.log("New category added:", response.data);
                    fetchData(); // Refresh the data after adding the new category
                    setNewCategory({ category_name: "" }); // Clear the input field
                    setSuccessMessage("Category added successfully!"); // Set the success message
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 1000);
                } catch (error) {
                    console.error("Error adding category:", error);
                }
            }
        }
    };
    
    
      

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="action">
                <div className="action-item">Action item:</div>
                <div className="modify">
                    <a href="#">
                        <img className="CateImg" src={addImg} alt="add" />
                    </a>
                    <a href="#">
                        <img className="CateImg" src={editImg} alt="edit" />
                    </a>
                    <a href="#">
                        <img className="CateImg" src={delImg} alt="delete" />
                    </a>
                </div>
            </div>

            <div className="Category">
                <div className="Category_Details">Add new category below:</div>
            </div>
            <div className="table-wrapper">
                <table className="table-sapce">
                    <thead>
                        <tr className="bg-info sticky-header">
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newCategory.category_name}
                                    onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            {error && <div className="error-message">{error}</div>}
            {SuccessMessage && <div className="success-message">{SuccessMessage}</div>}

            <button className="back_option" onClick={handlecategory}>Back</button>
            <button className="save" onClick={handleSave}>Save</button>


            <div className="bottom-border"></div>
        </div>
    );
};

export default Category_add;

