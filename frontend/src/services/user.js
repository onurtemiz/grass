import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/users'
    : '/api/users';

const updateUser = async (user) => {
  console.log('user', user);
  const res = await axios.put(baseUrl, user, config);
  return res.data;
};

export default {
  updateUser,
};
