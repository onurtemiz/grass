import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/campuses'
    : '/api/campuses';

const getAll = async (setCampuses) => {
  const res = await axios.get(`${baseUrl}/`, config);
  console.log('res', res);
  setCampuses(res.data);
};

export default {
  getAll,
};
