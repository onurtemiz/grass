import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/teachers';

const addInf = async (start, count) => {
  const req = await axios.get(`${baseUrl}?start=${start}&total=${count}`);
  return req.data;
};

const getTeacherPage = async (name) => {
  const req = await axios.get(`${baseUrl}?name=${name}`);
  return req.data;
};

const getTotalTeacher = async () => {
  const req = await axios.get(`${baseUrl}/total`);
  return req.data;
};

export default {
  addInf,
  getTeacherPage,
  getTotalTeacher,
};
