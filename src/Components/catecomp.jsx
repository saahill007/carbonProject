import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../axiosconfig';


const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/Category_name");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </select>
      <p>Selected Category: {selectedCategory}</p>
    </div>
  );
};

export default CategoryDropdown;