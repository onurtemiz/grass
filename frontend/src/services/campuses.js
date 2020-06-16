import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/campuses'
    : '/api/campuses';

const getAll = async (setCampuses) => {
  try {
    const res = await axios.get(`${baseUrl}/`, config);
    setCampuses(res.data);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getCampusByName = async (name, setCampus) => {
  try {
    const res = await axios.get(`${baseUrl}/${name}`, config);
    setCampus(res.data);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  getAll,
  getCampusByName,
};
