import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/all'
    : '/api/all';

const getTotal = async (filter) => {
  try {
    const req = await axios.get(`${baseUrl}/total?search=${filter}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const addInf = async (start, count, filter) => {
  try {
    const url =
      filter === ''
        ? `${baseUrl}?start=${start}&total=${count}`
        : `${baseUrl}?start=${start}&total=${count}&search=${filter}`;
    const req = await axios.get(url, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  getTotal,
  addInf,
};
