import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/dorms'
    : '/api/dorms';

const getAll = async (setDorms) => {
  const res = await axios.get(`${baseUrl}/`, config);
  setDorms(res.data);
};

export default {
  getAll,
};
