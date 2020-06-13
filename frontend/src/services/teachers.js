import axios from 'axios';
import { config } from '../utils/token';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/teachers'
    : '/api/teachers';

const addInf = async (start, count, filter) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&search=${filter}`,
    config
  );
  return req.data;
};

const getTeacherPage = async (name) => {
  const req = await axios.get(`${baseUrl}/${name}`, config);
  return req.data;
};

const getTotalTeacher = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?search=${filter}`, config);
  return req.data;
};

export default {
  addInf,
  getTeacherPage,
  getTotalTeacher,
};
