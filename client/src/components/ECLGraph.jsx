import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const ECLGraph = () => {
  const [eclData, setEclData] = useState({});
  const [selectedFeature, setSelectedFeature] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/ecl-data")
      .then((res) => res.json())
      .then((data) => {
        setEclData(data);
        const firstFeature = Object.keys(data)[0];
        setSelectedFeature(firstFeature);
      });
  }, []);

  const handleChange = (e) => {
    setSelectedFeature(e.target.value);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <select
        value={selectedFeature}
        onChange={handleChange}
        className="form-select mb-3"
      >
        {Object.keys(eclData).map((feature) => (
          <option key={feature} value={feature}>
            {feature}
          </option>
        ))}
      </select>

      {selectedFeature && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={eclData[selectedFeature]}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis>
              <Label
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              >
                Expected Credit Loss (ECL)
              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ecl"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ECLGraph;
