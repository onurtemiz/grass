import axios from 'axios';
const baseUrl = '/api/all';

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
