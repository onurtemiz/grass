import axios from 'axios';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/teachers'
    : '/api/teachers';

const addInf = async (start, count, filter) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&search=${filter}`
  );
  return req.data;
};

const getTeacherPage = async (name) => {
  const req = await axios.get(`${baseUrl}/${name}`);
  return req.data;
};

const getTotalTeacher = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?search=${filter}`);
  return req.data;
};

export default {
  addInf,
  getTeacherPage,
  getTotalTeacher,
};
