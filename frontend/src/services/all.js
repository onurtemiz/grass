import axios from 'axios';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/all'
    : '/api/all';

const getTotal = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?search=${filter}`);
  return req.data;
};

const addInf = async (start, count, filter) => {
  const url =
    filter === ''
      ? `${baseUrl}?start=${start}&total=${count}`
      : `${baseUrl}?start=${start}&total=${count}&search=${filter}`;
  const req = await axios.get(url);
  return req.data;
};

export default {
  getTotal,
  addInf,
};
