import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell} from 'recharts';
import { LineChart, Line} from 'recharts';
import moment from 'moment';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import OpenCageGeocode from 'opencage-api-client';
import L from 'leaflet';
// import axiosInstance from './axiosconfig';

type CustomerData = {
  cust_id: number;
  date_answered: string;
  session_id: string;
  first_name: string;
  last_name: string;
  Email: string;
  total_carbon_footprint: number;
  number_of_trees: number;
  answers: string;
  zipcode: string;
  latitude: number; 
  longitude: number; 
};

type ComparisonOperator = '>' | '<' | '=';

const Dashboard: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [filteredData, setFilteredData] = useState<CustomerData[]>(customerData);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [zipcodeFilter, setZipcodeFilter] = useState<string>('');
  const [carbonFootprintFilter, setCarbonFootprintFilter] = useState<number | undefined>(undefined);
  const [treesFilter, setTreesFilter] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<CustomerData[]>([]);
  const [carbonComparison, setCarbonComparison] = useState<ComparisonOperator>('<');
  const [treesComparison, setTreesComparison] = useState<ComparisonOperator>('<');
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666', '#00C5CD', '#F08080'];

  const fetchData = async () => {
    try {
      const response = await axios.get<CustomerData[]>('http://localhost:3000/api/Customer');
      setCustomerData(response.data);
      setFilteredData(response.data); // Initialize filteredData with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  

  const handleFilter = async () => {
    try {
      let url = 'http://localhost:3000/api/Customer';
      
      if (fromDate && toDate && zipcodeFilter && carbonFootprintFilter && treesFilter) {
        url = `http://localhost:3000/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&zipcode=${zipcodeFilter}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      }
      else if (fromDate && toDate && carbonFootprintFilter && treesFilter) {
        url = `http://localhost:3000/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      }
      else if (fromDate && toDate && zipcodeFilter) {
        url = `http://localhost:3000/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&zipcode=${zipcodeFilter}`;
      } else if (fromDate && toDate && carbonFootprintFilter) {
        url = `http://localhost:3000/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}`;
      }else if (fromDate && toDate && treesFilter) {
        url = `http://localhost:3000/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      }else if (fromDate && toDate) {
        url = `http://localhost:3000/api/filterCustomer?fromDate=${fromDate}&toDate=${toDate}`;
      } else if (zipcodeFilter) {
        url = `http://localhost:3000/api/filterCustomer?zipcode=${zipcodeFilter}`;
      } else if (carbonFootprintFilter && treesFilter) {
        url = `http://localhost:3000/api/filterCustomer?carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      } else if (carbonFootprintFilter) {
        url = `http://localhost:3000/api/filterCustomer?carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}`;
      } else if (treesFilter) {
        url = `http://localhost:3000/api/filterCustomer?treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      }else if (zipcodeFilter && carbonFootprintFilter) {
        url = `http://localhost:3000/api/filterCustomer?zipcode=${zipcodeFilter}&carbonComparison=${carbonComparison}&carbonFootprintFilter=${carbonFootprintFilter}`;
      } else if (zipcodeFilter && treesFilter) {
        url = `http://localhost:3000/api/filterCustomer?zipcode=${zipcodeFilter}&treesComparison=${treesComparison}&treesFilter=${treesFilter}`;
      }
  
      const response = await axios.get<CustomerData[]>(url);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  

  const groupDataByDate = (data: CustomerData[]) => {
    const groupedData: { [date: string]: number } = {};
  
    data.forEach((item) => {
      const date = moment(item.date_answered).format('YYYY-MM-DD');
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
  
  
  

  const groupDataByCarbonFootprint = (data: CustomerData[]) => {
    const groupedData: { [range: string]: number } = {
      '0-1000': 0,
      '1000-2500': 0,
      '2500-5000': 0,
      '5000-7500': 0,
      '7500-10000': 0,
      '10000-15000': 0,
      '15000+': 0,
    };
  
    data.forEach((item) => {
      const { total_carbon_footprint } = item;
      if (total_carbon_footprint >= 0 && total_carbon_footprint < 1000) {
        groupedData['0-1000'] += 1;
      } else if (total_carbon_footprint >= 1000 && total_carbon_footprint < 2500) {
        groupedData['1000-2500'] += 1;
      } else if (total_carbon_footprint >= 2500 && total_carbon_footprint < 5000) {
        groupedData['2500-5000'] += 1;
      } else if (total_carbon_footprint >= 5000 && total_carbon_footprint < 7500) {
        groupedData['5000-7500'] += 1;
      } else if (total_carbon_footprint >= 7500 && total_carbon_footprint < 10000) {
        groupedData['7500-10000'] += 1;
      } else if (total_carbon_footprint >= 10000 && total_carbon_footprint < 15000) {
        groupedData['10000-15000'] += 1;
      } else {
        groupedData['15000+'] += 1;
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
  
    if (searchTerm.trim() !== '') {
      const terms = searchTerm.toLowerCase().split(' ');
      filtered = customerData.filter((item) => {
        const fullName = item.first_name.toLowerCase() + ' ' + item.last_name.toLowerCase();
        return terms.every((term) => fullName.includes(term));
      });
    }
  
    setFilteredData(filtered);
  };
  
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1); // Subtract one day from the date
    const formattedDate = date.toISOString().split('T')[0]; // Extracting the date part
    return formattedDate;
  };

  return (
    <div>
      {/* <h2>Admin Dashboard</h2> */}
      <div className="TopFilter">
       {/* <div className="datefilter"> */}
        <div className="date-input">
        <span className="placeholder-text">From Date</span>
          <input className="datein"
            type="date"
            placeholder=""
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
          <div className="date-input">
          <span className="placeholder-text">To Date</span>
            <input className="datein"
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
              if (/^\d*$/.test(input) || input === '') {
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
            onChange={(e) => setCarbonComparison(e.target.value as ComparisonOperator)}
            >
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
              <option value="=">{'='}</option>
            </select>
            <input
              type="number"
              placeholder="Carbon Footprint"
              value={carbonFootprintFilter ?? ''}
              onChange={(e) => setCarbonFootprintFilter(parseInt(e.target.value))}
            />
          </div>
          <div className="compare">
            <select
            value={treesComparison}
            onChange={(e) => setTreesComparison(e.target.value as ComparisonOperator)}
            >
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
              <option value="=">{'='}</option>
            </select>
            <input
              type="number"
              placeholder="Number of Trees"
              value={treesFilter ?? ''}
              onChange={(e) => setTreesFilter(parseInt(e.target.value))}
            />
          </div>
          <div> 
            <button className="apply-button" onClick={handleFilter}>Apply Filters</button>
          </div>
          <div className="search-container">
            <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => {
              const searchTerm = e.target.value;
              if (/^[a-zA-Z ]*$/.test(searchTerm) || searchTerm === '') {
                setSearchTerm(searchTerm);
                handleSearch(searchTerm);
              }
            }}
          />
          </div>
      </div>
      <div className='carbon-table'>
      <table className='tableclass'>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total Carbon Footprint</th>
            <th>Number of Trees</th>
            <th>Date Answered</th>
            <th>Zipcode</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.map((item) => (
            <tr key={item.cust_id}>
              <td>{item.cust_id}</td>
              <td>{item.first_name + ' ' + item.last_name}</td>
              <td>{item.Email}</td>
              <td>{item.total_carbon_footprint}</td>
              <td>{item.number_of_trees}</td>
              <td>{formatDate(item.date_answered)}</td>
              <td>{item.zipcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='graphs'>
      <div className='chart-container'>
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
    <div className='chart-container'>
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
      </div>
      </div>
      <div className='graph2'>
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
              {formattedCarbonFootprintData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        {/* <div className="map-container">
        <MapVisualization customerData={filteredData} />
      </div> */}

      </div>

     </div>
      
  );
};

export default Dashboard;