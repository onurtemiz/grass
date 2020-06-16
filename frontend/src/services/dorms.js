import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/dorms'
    : '/api/dorms';

const getAll = async (setDorms) => {
  try {
    const res = await axios.get(`${baseUrl}/`, config);
    setDorms(res.data);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getDormByName = async (name, setDorm) => {
  try {
    const res = await axios.get(`${baseUrl}/${name}`, config);
    setDorm(res.data);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};
export default {
  getAll,
  getDormByName,
};
