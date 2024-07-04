import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

export const initializeTransactions = () => axios.get('${API_URL}/initialize');

export const listTransactions = (page = 1, perPage = 10, search = '') => axios.get(API_URL, {
  params: { page, perPage, search }
});

export const getStatistics = (month) => axios.get('${API_URL}/statistics, { params: { month } }');

export const getBarChartData = (month) => axios.get('${API_URL}/bar-chart, { params: { month } }');

export const getPieChartData = (month) => axios.get('${API_URL}/pie-chart, { params: { month } }');

export const getCombinedData = (month) => axios.get('${API_URL}/combined-data, { params: { month } }');