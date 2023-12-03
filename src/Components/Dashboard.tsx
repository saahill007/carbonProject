/// <reference lib="dom" />
import React, { useState, useEffect } from "react";
// import axios from 'axios';
import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import moment from "moment";
import "leaflet/dist/leaflet.css";
import axiosInstance from "../axiosconfig";

// import axiosInstance from './axiosconfig';

type CustomerData = {
  cust_id: number;
  date_answered: string;
  session_id: string;
  first_name: string;
  last_name: string;
  age: string;
  email: string;
  total_carbon_footprint: number;
  number_of_trees: number;
  answers: string;
  zipcode: string;
  latitude: number;
  longitude: number;
};

type ComparisonOperator = ">" | "<" | "=";

const Dashboard: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [filteredData, setFilteredData] =
    useState<CustomerData[]>(customerData);
  const [fromDate, setFromDate] = useState<string>("");
  // const [ageChoices, setAgeChoices] = useState<string[]>([]);
  const [toDate, setToDate] = useState<string>("");
  const [zipcodeFilter, setZipcodeFilter] = useState<string>("");
  const [carbonFootprintFilter, setCarbonFootprintFilter] = useState<
    number | undefined
  >(undefined);
  const [treesFilter, setTreesFilter] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [data, setData] = useState<CustomerData[]>([]);
  const [carbonComparison, setCarbonComparison] =
    useState<ComparisonOperator>("<");
  const [treesComparison, setTreesComparison] =
    useState<ComparisonOperator>("<");
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF6666",
    "#00C5CD",
    "#F08080",
  ];

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<CustomerData[]>("/api/Customer");
      setCustomerData(response.data);
      setFilteredData(response.data); // Initialize filteredData with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // fetchAgeChoices();
  }, []);

  const handleFilter = async () => {
    try {
      let url = "/api/Customer";

      if (
        fromDate &&
        toDate &&
        zipcodeFilter &&
        carbonFootprintFilter &&
        treesFilter
      ) {
        url = `/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&zipcode=${zipcodeFilter}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      } else if (fromDate && toDate && carbonFootprintFilter && treesFilter) {
        url = `/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      } else if (fromDate && toDate && zipcodeFilter) {
        url = `/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&zipcode=${zipcodeFilter}`;
      } else if (fromDate && toDate && carbonFootprintFilter) {
        url = `/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}`;
      } else if (fromDate && toDate && treesFilter) {
        url = `/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      } else if (fromDate && toDate) {
        url = `/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}`;
      } else if (zipcodeFilter) {
        url = `/api/filterCustomer?zipcode=${zipcodeFilter}`;
      } else if (carbonFootprintFilter && treesFilter) {
        url = `/api/filterCustomer?carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      } else if (carbonFootprintFilter) {
        url = `/api/filterCustomer?carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}`;
      } else if (treesFilter) {
        url = `/api/filterCustomer?treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      } else if (zipcodeFilter && carbonFootprintFilter) {
        url = `/api/filterCustomer?zipcode=${zipcodeFilter}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}`;
      } else if (zipcodeFilter && treesFilter) {
        url = `/api/filterCustomer?zipcode=${zipcodeFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      }

      const response = await axiosInstance.get<CustomerData[]>(url);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const groupDataByDate = (data: CustomerData[]) => {
    const groupedData: { [date: string]: number } = {};

    data.forEach((item) => {
      const date = moment(item.date_answered).format("YYYY-MM-DD");
      if (date in groupedData) {
        groupedData[date] += 1;
      } else {
        groupedData[date] = 1;
      }
    });

    return Object.keys(groupedData).map((date) => ({
      date,
      count: groupedData[date],
    }));
  };
  const formattedData = groupDataByDate(filteredData);

  // const fetchAgeChoices = async () => {
  //   try {
  //     const response = await axiosInstance.get("/api/questions");
  //     const ageQuestion = response.data.find((question) => question.id === 104);
  
  //     console.log("Age Question:", ageQuestion);
  
  //     if (
  //       ageQuestion &&
  //       ageQuestion.choices &&
  //       Array.isArray(ageQuestion.choices[0])
  //     ) {
  //       const ageChoices = ageQuestion.choices[0].map((choice) =>
  //         typeof choice === "string" ? choice.trim() : choice
  //       );
  
  //       console.log("Age Choices:", ageChoices);

  //       setAgeChoices(ageChoices);
  
  //     }
  //   } catch (error) {
  //     console.error("Error fetching age choices:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAgeChoices();
  // }, []);

  const groupDataByAge = (data: CustomerData[]) => {
    const ageGroups: {
      [ageGroup: string]: {
        carbonFootprints: number[];
        treeCounts: number[];
        count: number;
      };
    } = {
      "0-18": { carbonFootprints: [], treeCounts: [], count: 0 },
      "19-39": { carbonFootprints: [], treeCounts: [], count: 0 },
      "40-65": { carbonFootprints: [], treeCounts: [], count: 0 },
      "65+": { carbonFootprints: [], treeCounts: [], count: 0 },
      // "50-60": { carbonFootprints: [], treeCounts: [], count: 0 },
      // "60+": { carbonFootprints: [], treeCounts: [], count: 0 },
      // add more age groups as needed
    };

    data.forEach((item) => {
      const { age, total_carbon_footprint, number_of_trees } = item;
  
      // Check if the age group exists, if not, initialize it
      if (!(age in ageGroups)) {
        ageGroups[age] = { carbonFootprints: [], treeCounts: [], count: 0 };
      }
  
      // Push values into the arrays of the corresponding age group
      ageGroups[age].carbonFootprints.push(total_carbon_footprint);
      ageGroups[age].treeCounts.push(number_of_trees);
      ageGroups[age].count++;
    });
  

    const formattedAverageData: {
      ageGroup: string;
      averageCarbonFootprint: number;
      averageTreeCount: number;
      count: number;
    }[] = [];

    for (const [
      ageGroup,
      { carbonFootprints, treeCounts, count },
    ] of Object.entries(ageGroups)) {
      if (carbonFootprints.length > 0 && treeCounts.length > 0) {
        const averageCarbonFootprint =
          carbonFootprints.reduce((acc, curr) => acc + curr, 0) /
          carbonFootprints.length;

        const averageTreeCount =
          treeCounts.reduce((acc, curr) => acc + curr, 0) / treeCounts.length;

        formattedAverageData.push({
          ageGroup,
          averageCarbonFootprint,
          averageTreeCount,
          count,
        });
      }
    }

    return formattedAverageData;
  };

  const formattedAverageData = groupDataByAge(filteredData);

  const CustomTooltip = ({ active, label }) => {
    if (active) {
      const data = formattedAverageData.find((item) => item.ageGroup === label);
      if (data) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`${label}`}</p>
            <p className="label">{`Average Carbon Footprint: ${data.averageCarbonFootprint}`}</p>
            <p className="label">{`Average Tree Count: ${data.averageTreeCount}`}</p>
            <p className="label">{`Count: ${data.count}`}</p>
          </div>
        );
      }
    }

    return null;
  };

  const groupDataByCarbonFootprint = (data: CustomerData[]) => {
    const groupedData: { [range: string]: number } = {
      // "0-1000": 0,
      // "1000-2500": 0,
      "100-5000 lbs": 0,
      "5000-10000 lbs": 0,
      "10000-15000 lbs": 0,
      "15000-20000 lbs": 0,
      "20000-25000 lbs": 0,
      "25000-30000 lbs": 0,
      "30000-40000 lbs":0,
      "40000+ lbs":0,
    };

    data.forEach((item) => {
      const { total_carbon_footprint } = item;
      if (total_carbon_footprint >= 100 && total_carbon_footprint < 5000) {
        groupedData["100-5000 lbs"] += 1;
      } else if (
        total_carbon_footprint >= 5000 &&
        total_carbon_footprint < 10000
      ) {
        groupedData["5000-10000 lbs"] += 1;
      } else if (
        total_carbon_footprint >= 10000 &&
        total_carbon_footprint < 15000
      ) {
        groupedData["10000-15000 lbs"] += 1;
      } else if (
        total_carbon_footprint >= 15000 &&
        total_carbon_footprint < 20000
      ) {
        groupedData["15000-20000 lbs"] += 1;
      } else if (
        total_carbon_footprint >= 20000 &&
        total_carbon_footprint < 25000
      ) {
        groupedData["20000-25000 lbs"] += 1;
      } else if (
        total_carbon_footprint >= 25000 &&
        total_carbon_footprint < 30000
      ) {
        groupedData["25000-30000 lbs"] += 1;
      } else if (
        total_carbon_footprint >= 30000 &&
        total_carbon_footprint < 40000
      ) {
        groupedData["30000-40000 lbs"] += 1;
      } 
      else {
        groupedData["40000+ lbs"] += 1;
      }
    });

    return Object.keys(groupedData).map((range) => ({
      name: `${range}`,
      value: groupedData[range],
    }));
  };

  const formattedCarbonFootprintData = groupDataByCarbonFootprint(filteredData);

  const handleSearch = (searchTerm: string) => {
    let filtered = customerData;

    if (searchTerm.trim() !== "") {
      const terms = searchTerm.toLowerCase().split(" ");
      filtered = customerData.filter((item) => {
        const fullName =
          item.first_name.toLowerCase() + " " + item.last_name.toLowerCase();
        return terms.every((term) => fullName.includes(term));
      });
    }

    setFilteredData(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate()); // Subtract one day from the date
    const formattedDate = date.toISOString().split("T")[0]; // Extracting the date part
    return formattedDate;
  };

  return (
    <div>
      {/* <h2>Admin Dashboard</h2> */}
      <div className="TopFilter">
        {/* <div className="datefilter"> */}
        <div className="date-input">
          <span className="placeholder-text">From Date</span>
          <input
            className="datein"
            type="date"
            placeholder=""
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="date-input">
          <span className="placeholder-text">To Date</span>
          <input
            className="datein"
            type="date"
            placeholder=""
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        {/* </div> */}
        <div className="zipcode">
          <span className="placeholder-text">Enter Zipcode Below</span>
          <input
            type="text"
            placeholder="Filter by Zipcode"
            value={zipcodeFilter}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*$/.test(input) || input === "") {
                setZipcodeFilter(input);
              }
            }}
          />
        </div>
      </div>
      <div className="secondline">
        <div className="compare">
          <select
            value={carbonComparison}
            onChange={(e) =>
              setCarbonComparison(e.target.value as ComparisonOperator)
            }
          >
            <option value=">">{">"}</option>
            <option value="<">{"<"}</option>
            <option value="=">{"="}</option>
          </select>
          <input
            type="number"
            placeholder="Carbon Footprint"
            value={carbonFootprintFilter ?? ""}
            onChange={(e) => setCarbonFootprintFilter(parseInt(e.target.value))}
          />
        </div>
        <div className="compare">
          <select
            value={treesComparison}
            onChange={(e) =>
              setTreesComparison(e.target.value as ComparisonOperator)
            }
          >
            <option value=">">{">"}</option>
            <option value="<">{"<"}</option>
            <option value="=">{"="}</option>
          </select>
          <input
            type="number"
            placeholder="Number of Trees"
            value={treesFilter ?? ""}
            onChange={(e) => setTreesFilter(parseInt(e.target.value))}
          />
        </div>
        <div>
          <button className="apply-button" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>
        {/* <div className="search-container">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => {
              const searchTerm = e.target.value;
              if (/^[a-zA-Z ]*$/.test(searchTerm) || searchTerm === "") {
                setSearchTerm(searchTerm);
                handleSearch(searchTerm);
              }
            }}
          />
        </div> */}
      </div>
      <div className="carbon-table">
        <table className="tableclass">
          <thead>
            <tr>
              <th>Customer ID</th>
              {/* <th>Name</th>
              <th>Email</th> */}
              <th>Age</th>
              <th>Total Carbon Footprint</th>
              <th>Number of Trees</th>
              <th>Date Answered</th>
              <th>Zipcode</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((item) => (
                <tr key={item.cust_id}>
                  <td>{item.cust_id}</td>
                  {/* <td>{item.first_name + " " + item.last_name}</td>
                  <td>{item.email}</td> */}
                  <td>{item.age}</td>
                  <td>{item.total_carbon_footprint}</td>
                  <td>{item.number_of_trees}</td>
                  <td>{formatDate(item.date_answered)}</td>
                  <td>{item.zipcode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="graphs">
        <div className="chart-container">
          <div className="chart-description">
            <h2>Customer Count Over Time</h2>
            <p>This line chart shows the count of customers on each date.</p>
          </div>
          <LineChart
            width={600}
            height={300}
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            {/* <YAxis /> */}
            <YAxis dataKey="count" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="average-data-graph">
          <div className="chart-description2">
            <h2>Average Data by Age Group</h2>
          </div>
          <BarChart
            width={600}
            height={300}
            data={formattedAverageData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup"/>
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip active={true} label="exampleLabel" />} />
            <Legend />
            <Bar
              dataKey="averageCarbonFootprint"
              fill="#8884d8"
              yAxisId="left"
            />
            <Bar dataKey="averageTreeCount" fill="#82ca9d" yAxisId="right" />
            {/* <Bar dataKey="count" fill="#ffc658" yAxisId="left"/> */}
          </BarChart>
        </div>
  
      </div>
      <div className="graph2">
        <div className="chart-container2">
        <div className="chart-description">
          <h2>Carbon Footprint Distribution</h2>
          <p>This pie chart illustrates the distribution of customers based on their total carbon footprint ranges in pounds (lbs).</p>
        </div>
          <PieChart width={400} height={400}>
            <Pie
              data={formattedCarbonFootprintData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={125}
              fill="#8884d8"
              label
            >
              {formattedCarbonFootprintData.map((entry, index) => {
                console.log(`Entry at index ${index}:`, entry);

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
