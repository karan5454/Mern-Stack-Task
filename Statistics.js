import React, { useEffect, useState } from 'react';
import { getStatistics } from '../services/api';

const Statistics = () => {
  const [statistics, setStatistics] = useState({});
  const [month, setMonth] = useState('');

  useEffect(() => {
    if (month) fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await getStatistics(month);
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Statistics</h2>
      <input
        type="text"
        placeholder="Month (e.g., 01)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button onClick={fetchStatistics}>Fetch Statistics</button>
      <div>
        <p>Total Sales: {statistics.totalSales}</p>
        <p>Sold Items Count: {statistics.soldItemsCount}</p>
        <p>Not Sold Items Count: {statistics.notSoldItemsCount}</p>
      </div>
    </div>
  );
};

export default Statistics;