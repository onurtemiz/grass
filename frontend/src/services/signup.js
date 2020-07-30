import axios from 'axios';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/signup'
    : '/api/signup';

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

const forgotPassword = async (email) => {
  try {
    const req = await axios.post(`${baseUrl}/forgot_password`, email);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const sendVerification = async (email) => {
  try {
    const req = await axios.post(`${baseUrl}/send_verification`, { email });
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const resetPassword = async (password, code, u) => {
  try {
    const res = await axios.post(
      `${baseUrl}/reset_password?code=${code}&u=${u}`,
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

const verify = async (verifyToken, u) => {
  try {
    const req = await axios.post(
      `${baseUrl}/verify?verifyToken=${verifyToken}&u=${u}`,
      null
    );
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
  forgotPassword,
  sendVerification,
};
