import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/clubs'
    : '/api/clubs';

const getTotal = async (filter) => {
  try {
    const req = await axios.get(`${baseUrl}/total?search=${filter}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getClubPageByName = async (name) => {
  try {
    const req = await axios.get(`${baseUrl}/${name}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const addInf = async (start, count, filter) => {
  try {
    const req = await axios.get(
      `${baseUrl}?start=${start}&total=${count}&search=${filter}`,
      config
    );
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const postClub = async (values, setName, setFullName, setIsLoading) => {
  const req = await axios.post(`${baseUrl}`, values, config);
  setName('');
  setFullName('');
  setIsLoading('');
  return req.data;
};

const editClub = async (club) => {
  const req = await axios.put(`${baseUrl}/${club.id}`, club, config);

  return req.data;
};

export default {
  getTotal,
  postClub,
  addInf,
  getClubPageByName,
  editClub,
};
