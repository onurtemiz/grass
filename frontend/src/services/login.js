import axios from 'axios';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/login'
    : '/api/login';

const login = async (user) => {
  try {
    const req = await axios.post(baseUrl, user);
    return req.data;
  } catch (e) {
    return { error: 'Şifre veya Eposta hatalı cem.' };
  }
};

export default {
  login,
};
