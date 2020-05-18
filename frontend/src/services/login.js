import axios from 'axios';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/login'
    : '/api/login';

const login = async (user) => {
  const req = await axios.post(baseUrl, user);
  return req.data;
};

export default {
  login,
};
