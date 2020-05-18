import axios from 'axios';

const baseUrl = '/api/users/signup';

const signup = async (user) => {
  const req = await axios.post(baseUrl, user);
  console.log('req.data', req.data);
  return req.data;
};

export default {
  signup,
};
