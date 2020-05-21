import axios from 'axios';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/users/signup'
    : '/api/users/signup';

const signup = async (user) => {
  const req = await axios.post(baseUrl, user);
  return req.data;
};

export default {
  signup,
};
