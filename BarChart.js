import React, { useEffect, useState } from 'react';
import { getBarChartData } from '../services/api';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [month, setMonth] = useState('');

  useEffect(() => {
    if (month) fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await getBarChartData(month);
      setBarChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: barChartData.map((data) => data.range),
    datasets: [
      {
        label: '# of Transactions',
        data: barChartData.map((data) => data.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <input
        type="text"
        placeholder="Month (e.g., 01)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button onClick={fetchBarChartData}>Fetch Bar Chart Data</button>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;