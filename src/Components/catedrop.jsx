import React from "react";
import CategoryDropdown from "./catecomp";

const MyComponent = () => {
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
    };
  
    const headerStyle = {
      textAlign: "center",
      fontSize: "24px",
      marginBottom: "20px",
    };
  
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Categories</h1>
        <CategoryDropdown />
      </div>
    );
  };
  
  export default MyComponent;
