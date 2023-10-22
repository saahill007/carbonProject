import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./category_edit.css"; // Import your CSS file
import axios from "axios";

interface category {
    category_id: number;
    category_name: string;
}

const CategoryEdit: React.FC = () => {
    const { categoryIds } = useParams<{ categoryIds?: string }>();
    const categoryIdArray = categoryIds ? categoryIds.split(",") : [];
    const [categoryData, setCategoryData] = useState<category[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [SuccessMessage, setSuccessMessage] = useState<string>(""); 
    const navigate = useNavigate();
    const [editCategory, setEditCategory] = useState<category | null>({
        category_id: 0, // Provide a default value or the appropriate data type for admin_id
        category_name: "",
    });

    useEffect(() => {
        // Function to fetch admin data
        const fetchCategoryData = async () => {
            // Loop through adminIdArray and fetch data for each admin ID
            const categoryDataPromises = categoryIdArray.map(async (categoryId) => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/category/${categoryId}`); // Replace with your API endpoint
                    return response.data; // Assuming the response contains the admin data
                } catch (error) {
                    console.error(`Error fetching admin data for admin ID ${categoryId}:`, error);
                    return null; // Handle errors gracefully
                }
            });
            // Wait for all requests to complete
            const categoryDataResults = await Promise.all(categoryDataPromises);
            // Filter out any null values (failed requests)
            const filteredCategoryData = categoryDataResults.filter((data) => data !== null);
            // Update the state with the fetched data
            setCategoryData(filteredCategoryData);
        };
        // Fetch data when the component mounts
        fetchCategoryData();
    }, [categoryIdArray]); // Re-fetch data when adminIdArray changes

    const handleEdit = (category: category) => {
        setEditCategory(category);
    };

    const handleSave = async () => {
        
        const onlyLetters = /^[A-Za-z]+$/;
    
        // if (!editCategory.category_name.match(onlyLetters)) {
        //     setErrorMessage("Category name should only contain alphabets.");
        //     setTimeout(() => {
        //         setErrorMessage("");
        //     }, 1000);
        //     return;
        // }
        if (editCategory.category_name) {
            try {
                // Send a POST request to your API endpoint for updating admin data
                await axios.post(`http://localhost:3000/api/update_category/${editCategory.category_id}`, {
                    category_name: `${editCategory.category_name}`, // Enclose in backticks to ensure it's treated as a string
                });


                // Clear the editAdmin state
                setEditCategory(null);

                // Update the state with the saved data
                setCategoryData((prevCategoryData) =>
                    prevCategoryData.map((category) =>
                        category.category_id === editCategory.category_id ? editCategory : category
                    )
                );

                setErrorMessage(null);
                setSuccessMessage("Category data saved successfully!");

                console.log("Category data saved successfully!");
            } catch (error) {
                console.error("Error saving category data:", error);
            }
        }
        else {
            // Handle the case where either Name or Email is empty
            setErrorMessage("Name and Email fields cannot be empty. Please fill them in.");
        }
    };

    const handlecategory = () => {
        navigate("/values/category");
    };

    return (
        <div className="category-edit-container">
            <div className="category-edit-header">
                <h2 className="edit-title">Edit category</h2>
            </div>
            <div className="table-wrapper">
                <table className="table-space">
                    <thead>
                        <tr className="sticky-header">
                            <th>Category ID</th>
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {categoryData.map((category) => (
                            <tr key={category.category_id}>
                                <td>{category.category_id}</td>
                                <td>
                                    {editCategory?.category_id === category.category_id ? (
                                        <input
                                            type="text"
                                            placeholder={category.category_name}
                                            value={editCategory.category_name}
                                            onChange={(e) => setEditCategory({ ...editCategory, category_name: e.target.value })}
                                        />
                                    ) : (
                                        category.category_name
                                    )}
                                </td>
            
                                <td>
                                    {editCategory?.category_id === category.category_id ? (
                                        <button className="savebutton" onClick={handleSave}>Save</button>
                                    ) : (
                                        <button className="edit" onClick={() => handleEdit(category)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {errorMessage && <div className="error_message">{errorMessage}</div>}
            {SuccessMessage && <div className="success_message">{SuccessMessage}</div>}

            <button className="back" onClick={handlecategory}>Back</button>
            <div className="bottom-border"></div>
        </div>
    );
};

export default CategoryEdit;

