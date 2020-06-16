import axios from 'axios';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/users/signup'
    : '/api/users/signup';

const signup = async (user) => {
  try {
    const req = await axios.post(baseUrl, user);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  signup,
};
