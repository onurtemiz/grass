import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/users'
    : '/api/users';

const updateUser = async (user) => {
  try {
    const res = await axios.put(baseUrl, user, config);
    return res.data;
  } catch (e) {
    return { error: 'Şu anki şifre yanlış' };
  }
};

const getPopulatedUser = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`);
  return res.data;
};

export default {
  updateUser,
  getPopulatedUser,
};
