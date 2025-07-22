import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import ECLGraph from '../components/ECLGraph';
import UploadReport from '../components/UploadReport';

import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function DashboardCRO() {

  
  const fields = ["Age", "Experience", "Income", "Family", "CCAvg", "Education", "Mortgage", "Securities Account", "CD Account", "Online", "CreditCard"];

const [field1, setField1] = useState("");
const [field2, setField2] = useState("");
const [data1, setData1] = useState([]);
const [data2, setData2] = useState([]);
const [load, setLoad] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    if (!field1 || !field2) return;
    setLoading(true);
    try {
      const res = await axios.get("https://expected-credit-loss-calculation-fast-api.onrender.com/ecl-data");
      setData1(res.data[field1]);
      setData2(res.data[field2]);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [field1, field2]);


  const [activeTab, setActiveTab] = useState('records');
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);

  // Filters
  const [educationFilter, setEducationFilter] = useState('All');
  const [creditCardFilter, setCreditCardFilter] = useState('All');
  const [incomeMin, setIncomeMin] = useState('');
  const [incomeMax, setIncomeMax] = useState('');
  const [aiQuery, setAiQuery] = useState("");
const [aiResponse, setAiResponse] = useState("");
const [loading, setLoading] = useState(false);

const handleAiSubmit = async () => {
  setLoading(true);
  try {
    const res = await fetch("https://expected-credit-loss-calculation.onrender.com/api/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: aiQuery }),
    });
    const data = await res.json();
    setAiResponse(data.response);
  } catch (error) {
    setAiResponse("Error getting response from AI.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    axios.get('http://localhost:8080/api/loans')
      .then(res => {
        setLoans(res.data);
        setFilteredLoans(res.data);
      })
      .catch(err => console.error("Error fetching loans:", err));
  }, []);

  const applyFilters = () => {
    let filtered = [...loans];

    if (educationFilter !== 'All') {
      filtered = filtered.filter(loan => String(loan.Education) === educationFilter);
    }

    if (creditCardFilter !== 'All') {
      filtered = filtered.filter(loan => loan.CreditCard === Number(creditCardFilter));
    }

    if (incomeMin !== '') {
      filtered = filtered.filter(loan => loan.Income >= parseFloat(incomeMin));
    }

    if (incomeMax !== '') {
      filtered = filtered.filter(loan => loan.Income <= parseFloat(incomeMax));
    }

    setFilteredLoans(filtered);
  };

  const resetFilters = () => {
    setEducationFilter('All');
    setCreditCardFilter('All');
    setIncomeMin('');
    setIncomeMax('');
    setFilteredLoans(loans);
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        {/* Tabs */}
        <ul className="nav nav-tabs">
          {['records','reports'].map(tab => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'records' ? 'Loan Records' :'Reports'}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'records' && (
            <>
              {/* Filters */}
              <div className="row mb-3">
                <div className="col-md-2">
                  <label>Education</label>
                  <select
                    className="form-select"
                    value={educationFilter}
                    onChange={e => setEducationFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="1">Undergrad</option>
                    <option value="2">Graduate</option>
                    <option value="3">Advanced</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label>Credit Card</label>
                  <select
                    className="form-select"
                    value={creditCardFilter}
                    onChange={e => setCreditCardFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="1">Has Card</option>
                    <option value="0">No Card</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label>Income Min</label>
                  <input
                    type="number"
                    className="form-control"
                    value={incomeMin}
                    onChange={e => setIncomeMin(e.target.value)}
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="col-md-2">
                  <label>Income Max</label>
                  <input
                    type="number"
                    className="form-control"
                    value={incomeMax}
                    onChange={e => setIncomeMax(e.target.value)}
                    placeholder="e.g., 150"
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button className="btn btn-primary w-100" onClick={applyFilters}>
                    Apply Filters
                  </button>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button className="btn btn-secondary w-100" onClick={resetFilters}>
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Age</th>
                      <th>Experience</th>
                      <th>Income</th>
                      <th>ZIP Code</th>
                      <th>Family</th>
                      <th>CCAvg</th>
                      <th>Education</th>
                      <th>Mortgage</th>
                      <th>Personal Loan</th>
                      <th>Securities Account</th>
                      <th>CD Account</th>
                      <th>Online</th>
                      <th>CreditCard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLoans.map((loan, idx) => (
                      <tr key={idx}>
                        <td>{loan.Age}</td>
                        <td>{loan.Experience}</td>
                        <td>{loan.Income}</td>
                        <td>{loan["ZIP Code"]}</td>
                        <td>{loan.Family}</td>
                        <td>{loan.CCAvg}</td>
                        <td>{loan.Education}</td>
                        <td>{loan.Mortgage}</td>
                        <td>{loan["Personal Loan"]}</td>
                        <td>{loan["Securities Account"]}</td>
                        <td>{loan["CD Account"]}</td>
                        <td>{loan.Online}</td>
                        <td>{loan.CreditCard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === 'reports' && (
  <div>
    <h4 className="text-center text-secondary">ECL Comparison Report</h4>
    <p className="text-muted text-center">Select two features to compare ECL trends</p>

    <div className="d-flex justify-content-center gap-3 my-3">
      <select
        className="form-select"
        value={field1}
        onChange={(e) => setField1(e.target.value)}
      >
        <option value="">Select Field 1</option>
        {fields.map((field) => (
          <option key={field} value={field}>{field}</option>
        ))}
      </select>

      <select
        className="form-select"
        value={field2}
        onChange={(e) => setField2(e.target.value)}
      >
        <option value="">Select Field 2</option>
        {fields.map((field) => (
          <option key={field} value={field}>{field}</option>
        ))}
      </select>
    </div>

    {load && <p className="text-center text-info">Loading chart...</p>}

    {!load && field1 && field2 && (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="ecl"
            name={field1}
            data={data1}
            stroke="#8884d8"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            dataKey="ecl"
            name={field2}
            data={data2}
            stroke="#82ca9d"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )}

    {!load && (!field1 || !field2) && (
      <p className="text-center text-danger">Please select two fields to compare.</p>
    )}
  </div>
)}
      <ChatBox />
      <UploadReport />
        </div>
      </div>
    </div>
  );
}
