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
import axiosInstance from "./axiosconfig";

// import axiosInstance from './axiosconfig';

type CustomerData = {
  cust_id: number;
  date_answered: string;
  session_id: string;
  first_name: string;
  last_name: string;
  age: number;
  Email: string;
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

  const groupDataByAge = (data: CustomerData[]) => {
    const ageGroups: {
      [ageGroup: string]: {
        carbonFootprints: number[];
        treeCounts: number[];
        count: number;
      };
    } = {
      "age<20": { carbonFootprints: [], treeCounts: [], count: 0 },
      "20-30": { carbonFootprints: [], treeCounts: [], count: 0 },
      "30-40": { carbonFootprints: [], treeCounts: [], count: 0 },
      "40-50": { carbonFootprints: [], treeCounts: [], count: 0 },
      "50-60": { carbonFootprints: [], treeCounts: [], count: 0 },
      "60+": { carbonFootprints: [], treeCounts: [], count: 0 },
      // add more age groups as needed
    };

    data.forEach((item) => {
      const { age, total_carbon_footprint, number_of_trees } = item;

      if (age <= 20) {
        ageGroups["age<20"].carbonFootprints.push(total_carbon_footprint);
        ageGroups["age<20"].treeCounts.push(number_of_trees);
        ageGroups["age<20"].count++;
      } else if (age > 20 && age <= 30) {
        ageGroups["20-30"].carbonFootprints.push(total_carbon_footprint);
        ageGroups["20-30"].treeCounts.push(number_of_trees);
        ageGroups["20-30"].count++;
      } else if (age > 30 && age <= 40) {
        ageGroups["30-40"].carbonFootprints.push(total_carbon_footprint);
        ageGroups["30-40"].treeCounts.push(number_of_trees);
        ageGroups["30-40"].count++;
      } else if (age > 40 && age <= 50) {
        ageGroups["40-50"].carbonFootprints.push(total_carbon_footprint);
        ageGroups["40-50"].treeCounts.push(number_of_trees);
        ageGroups["40-50"].count++;
      } else if (age > 50 && age <= 60) {
        ageGroups["50-60"].carbonFootprints.push(total_carbon_footprint);
        ageGroups["50-60"].treeCounts.push(number_of_trees);
        ageGroups["50-60"].count++;
      } else if (age > 60) {
        ageGroups["60+"].carbonFootprints.push(total_carbon_footprint);
        ageGroups["60+"].treeCounts.push(number_of_trees);
        ageGroups["60+"].count++;
      }
      // add more conditions for other age groups
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
      "0-1000": 0,
      "1000-2500": 0,
      "2500-5000": 0,
      "5000-7500": 0,
      "7500-10000": 0,
      "10000-15000": 0,
      "15000+": 0,
    };

    data.forEach((item) => {
      const { total_carbon_footprint } = item;
      if (total_carbon_footprint >= 0 && total_carbon_footprint < 1000) {
        groupedData["0-1000"] += 1;
      } else if (
        total_carbon_footprint >= 1000 &&
        total_carbon_footprint < 2500
      ) {
        groupedData["1000-2500"] += 1;
      } else if (
        total_carbon_footprint >= 2500 &&
        total_carbon_footprint < 5000
      ) {
        groupedData["2500-5000"] += 1;
      } else if (
        total_carbon_footprint >= 5000 &&
        total_carbon_footprint < 7500
      ) {
        groupedData["5000-7500"] += 1;
      } else if (
        total_carbon_footprint >= 7500 &&
        total_carbon_footprint < 10000
      ) {
        groupedData["7500-10000"] += 1;
      } else if (
        total_carbon_footprint >= 10000 &&
        total_carbon_footprint < 15000
      ) {
        groupedData["10000-15000"] += 1;
      } else {
        groupedData["15000+"] += 1;
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
    date.setDate(date.getDate() - 1); // Subtract one day from the date
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
        <div className="search-container">
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
        </div>
      </div>
      <div className="carbon-table">
        <table className="tableclass">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
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
                  <td>{item.first_name + " " + item.last_name}</td>
                  <td>{item.Email}</td>
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
          <LineChart
            width={600}
            height={300}
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="average-data-graph">
          <BarChart
            width={600}
            height={300}
            data={formattedAverageData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              content={<CustomTooltip active={true} label="exampleLabel" />}
            />

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
        {/* <div className='chart-container'>
        <BarChart
          width={600}
          height={300}
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cust_id" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_carbon_footprint" fill="#8884d8" yAxisId="left" />
          <Bar dataKey="number_of_trees" fill="#82ca9d" yAxisId="right" />
        </BarChart>
      </div> */}
      </div>
      <div className="graph2">
        <div className="chart-container">
          <PieChart width={400} height={400}>
            <Pie
              data={formattedCarbonFootprintData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
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
