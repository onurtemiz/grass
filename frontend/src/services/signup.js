import axios from 'axios';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/signup'
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

const resetPassword = async (email) => {
  try {
    const req = await axios.post(`${baseUrl}/reset_password`, email);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const changePassword = async (password, code, id) => {
  try {
    const res = await axios.post(
      `${baseUrl}/change_password?code=${code}&id=${id}`,
      {
        password,
      }
    );
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const verify = async (verifyToken) => {
  try {
    const req = await axios.post(`${baseUrl}/verify/${verifyToken}`, null);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  signup,
  verify,
  resetPassword,
  changePassword,
};
