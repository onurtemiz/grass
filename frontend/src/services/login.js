import axios from 'axios';
const baseUrl = '/api/login';

const login = async (user) => {
  const req = await axios.post(baseUrl, user);
  return req.data;
};

export default {
  login,
};
