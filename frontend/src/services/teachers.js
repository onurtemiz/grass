import axios from 'axios';
import { config } from '../utils/token';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/teachers'
    : '/api/teachers';

const addInf = async (start, count, filter) => {
  try {
    const req = await axios.get(
      `${baseUrl}?start=${start}&total=${count}&search=${filter}`,
      config
    );
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getTeacherPage = async (name) => {
  try {
    const req = await axios.get(`${baseUrl}/${name}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getTotalTeacher = async (filter) => {
  try {
    const req = await axios.get(`${baseUrl}/total?search=${filter}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  addInf,
  getTeacherPage,
  getTotalTeacher,
};
