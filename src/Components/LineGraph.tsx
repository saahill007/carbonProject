import React from "react";
import traffic from "../assets/traffic.jpg";

const LineGraph = () => {
  return (
    <div className="traffic-comp" style={{ width: "50%", float: "left" }}>
      <img src={traffic} style={{ height: 400 }}></img>
    </div>
  );
};

export default LineGraph;
