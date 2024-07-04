import React, { useEffect, useState } from 'react';
import { getPieChartData } from '../services/api';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [month, setMonth] = useState('');

  useEffect(() => {
    if (month) fetchPieChartData();
  }, [month]);

  const fetchPieChartData = async () => {
    try {
      const response = await getPieChartData(month);
      setPieChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: pieChartData.map((data) => data.category),
    datasets: [
      {
        label: '# of Transactions',
        data: pieChartData.map((data) => data.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <input
        type="text"
        placeholder="Month (e.g., 01)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button onClick={fetchPieChartData}>Fetch Pie Chart Data</button>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;