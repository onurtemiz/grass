import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/teachers';

const addInf = async (start, count) => {
  const req = await axios.get(`${baseUrl}?start=${start}&total=${count}`);
  return req.data;
};

export default {
  addInf,
};
