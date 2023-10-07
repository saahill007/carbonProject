// ValuesLandingPage.tsx
import React from "react";
import TextBox from "./TextBox";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
// import PieChart from "./PieChart";
const pieChartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const pieChartOptions = {
  // Your chart options...
};
const ValuesLandingPage: React.FC = () => {
  return (
    <div>
      {/* <h2>Values Landing Page</h2> */}
      <TextBox content="Welcome, Admin! This is your dedicated dashboard for monitoring and analyzing website's performance. We understand the importance of data-driven decisions, and here, you'll find all the key metrics and insights you need to assess website's effectiveness." />
      <div style={{ overflow: "hidden", paddingTop: 75 }}>
        <LineGraph />
        <PieChart></PieChart>
      </div>
    </div>
  );
};

export default ValuesLandingPage;
