import React from "react";

const AdminDashboard: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
  };

  const dashboardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "800px",
    textAlign: "center",
    animation: "fadeInUp 0.8s ease-in-out",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  };

  const greetingStyle: React.CSSProperties = {
    fontSize: "30px",
    color: "#FF5701",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const welcomeStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "bold",
  };

  const insightsStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "#555",
    fontWeight: "normal",
  };

  const handleHover = () => {
    // Add any hover effects here
    dashboardStyle.transform = "scale(1.05)";
  };

  const handleHoverEnd = () => {
    // Reset the transform on hover out
    dashboardStyle.transform = "scale(1)";
  };

  return (
    <div style={containerStyle}>
      <div
        style={dashboardStyle}
        onMouseOver={handleHover}
        onMouseOut={handleHoverEnd}
      >
        <p style={greetingStyle}>Greetings, Admin! </p>
        <p style={welcomeStyle}>
          Welcome to your exclusive dashboard, meticulously crafted for
          overseeing and analyzing the data from our website.
        </p>
        <p style={insightsStyle}>
          Recognizing the significance of data-driven decisions, we've curated a
          collection of key metrics and insights to empower you in evaluating
          the effectiveness of the website.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
