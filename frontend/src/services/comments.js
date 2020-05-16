import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/comments';

const allComments = async (user) => {
  const req = await axios.post(baseUrl, user);
  return req.data;
};

export default {
  login,
};
