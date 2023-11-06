// import React from "react";
import { Link } from "react-router-dom";

import "./Desktop.css";
import Choice from "./Choice";

export const Desktop = (): JSX.Element => {
  const handleValuesChange = (choice: string, value: number) => {
    // Handle the values change here in your main component
    console.log("Choice:", choice);
    console.log("Value:", value);
  };
  return (
    <div className="desktop">
      <div className="div">
        <div className="overlap">
          <img className="line" alt="Line" src="line-1.svg" />
        </div>
        <div className="q-pattern">
          <div className="rectangle" />
        </div>
        <div className="overlap-2">
          <div className="ques-toggle">
            <div className="overlap-3">
              <p className="p">
                Does this Question depend on no. of people in this household?
              </p>
              {/* <ToogleSwitch className="toogle-switch" /> */}
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-3">
              <p className="p">
                Does this Question take the zip code into consideration?
              </p>
              {/* <ToogleSwitch className="toogle-switch" /> */}
            </div>
          </div>
          <p className="text-wrapper-8">Select the type of answer you want</p>
        </div>
        <div className="overlap-4">
          <div className="text-wrapper-9">*</div>
          <div className="text-wrapper-10">user input</div>
          <div className="text-wrapper-11">=</div>
          <div className="overlap-5">
            <div className="option-select">
              <div className="text-wrapper-12">Fill in the blank</div>
              <div className="ellipse" />
            </div>
            <div className="ellipse-2" />
          </div>
          <div className="text-wrapper-13">Select Units</div>
          <div className="text-wrapper-14">Miles/week</div>
          <div className="text-wrapper-15">Miles/Year</div>
          <div className="button-selection">
            <div className="div-wrapper">
              <div className="text-wrapper-16">Miles/week</div>
            </div>
          </div>
          <button className="button">
            <div className="div-wrapper">
              <div className="text-wrapper-16">Save</div>
            </div>
          </button>
          <div className="button-selection-2">
            <div className="div-wrapper">
              <div className="text-wrapper-16">Miles / Year</div>
            </div>
          </div>
          <div className="button-selection-3">
            <div className="overlap-6">
              <div className="text-wrapper-16">Gallon</div>
            </div>
          </div>
          <div className="button-selection-4">
            <div className="overlap-7">
              <div className="text-wrapper-17">1000 cubic feet</div>
            </div>
          </div>
          <div className="button-selection-5">
            <div className="overlap-7">
              <div className="text-wrapper-17">KWH</div>
            </div>
          </div>
          <div className="button-selection-6">
            <div className="overlap-6">
              <div className="text-wrapper-16">Therms</div>
            </div>
          </div>
          <div className="button-selection-7">
            <div className="overlap-8">
              <div className="rectangle-2" />
              <div className="text-wrapper-18">Dollars</div>
            </div>
          </div>
          <div className="option-select-2">
            <div className="text-wrapper-19">Single / Multiple Selection</div>
            <div className="ellipse" />
          </div>
          <div className="overlap-9">
            <div className="text-wrapper-20">Select Formula</div>
          </div>
          <div className="group-3">
            <div className="overlap-10">
              <div className="text-wrapper-21">Select Formula</div>
            </div>
          </div>
          <div className="group-4">
            <div className="overlap-11">
              <div className="text-wrapper-22">Select variable</div>
            </div>
          </div>
          <div className="group-5">
            <div className="overlap-11">
              <div className="text-wrapper-22">Select variable</div>
            </div>
          </div>
          <div className="group-6">
            <div className="overlap-11">
              <div className="text-wrapper-22">Select variable</div>
            </div>
          </div>
          <div className="group-7">
            <div className="overlap-11">
              <div className="text-wrapper-22">Select variable</div>
            </div>
          </div>
          <div className="group-8">
            <div className="overlap-12">
              <div className="text-wrapper-23">value</div>
            </div>
          </div>
          <div className="group-9 group-10">
            <Choice onValuesChange={handleValuesChange} />
            {/* <div className="overlap-12">
              <div className="text-wrapper-23">varible</div>
            </div>
          </div>
          <div className="group-10">
            <div className="overlap-12">
              <div className="text-wrapper-23">vlue</div>
            </div> */}
          </div>
          <div className="group-11">
            <div className="overlap-12">
              <div className="text-wrapper-23">value</div>
            </div>
          </div>
          <div className="text-wrapper-24">OR</div>
          <div className="text-wrapper-25">OR</div>
          <div className="overlap-13">
            <div className="text-wrapper-26">Formula Name</div>
          </div>
          <img className="img" alt="Line" src="line-8.svg" />
          <div className="text-wrapper-27">Add new variable</div>
          <div className="group-12">
            <div className="overlap-14">
              <div className="text-wrapper-28">Save New Formula</div>
            </div>
          </div>
        </div>
        <div className="button-selection-8">
          <div className="overlap-15">
            <div className="text-wrapper-29">Save</div>
          </div>
          <button className="button-selection-9">
            <div className="overlap-group-2">
              <div className="text-wrapper-29">Back</div>
            </div>
          </button>
        </div>
        <div className="group-13">
          <Link className="button-selection-10" to="/desktop-u45-9">
            <div className="overlap-group-3">
              <div className="text-wrapper-30">All types (With Units)</div>
            </div>
          </Link>
          <div className="button-selection-11">
            <div className="overlap-16">
              <div className="text-wrapper-30">All types (No Units)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
