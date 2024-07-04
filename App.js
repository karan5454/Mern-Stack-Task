import React from 'react';
import TransactionsList from './components/TransactionsList';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  return (
    <div className="App">
      <h1>MERN Stack Challenge</h1>
      <TransactionsList />
      <Statistics />
      <BarChart />
      <PieChart />
    </div>
  );
};

export default App;