import React from "react";

// Define a function to calculate the area of a rectangle
function calculateRectangleArea(width: number, height: number): number {
  return width * height;
}

// Define a function to calculate the volume of a cylinder
function calculateCylinderVolume(radius: number, height: number): number {
  const baseArea = Math.PI * Math.pow(radius, 2);
  return baseArea * height;
}

function milesPerYearToGallon(milesPerYear: number, mileageOfCar: number) {
  return milesPerYear * mileageOfCar;
}
// Example usage
const rectangleArea = calculateRectangleArea(5, 10);
console.log("Rectangle Area:", rectangleArea);

const cylinderVolume = calculateCylinderVolume(3, 8);
console.log("Cylinder Volume:", cylinderVolume);

const formulasScript = () => {
  return <div>formulasScript</div>;
};

export default formulasScript;
