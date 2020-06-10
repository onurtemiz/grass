import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/campuses'
    : '/api/campuses';

const getAll = async (setCampuses) => {
  const res = await axios.get(`${baseUrl}/`, config);
  setCampuses(res.data);
};

const getCampusByName = async (name, setCampus) => {
  const res = await axios.get(`${baseUrl}/${name}`, config);
  setCampus(res.data);
};

export default {
  getAll,
  getCampusByName,
};
