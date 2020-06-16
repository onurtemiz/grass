import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/tips'
    : '/api/tips';

const getTip = async () => {
  try {
    const req = await axios.get(`${baseUrl}/random`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getAllTips = async () => {
  try {
    const req = await axios.get(`${baseUrl}/all`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const addInf = async (start, count) => {
  try {
    const req = await axios.get(
      `${baseUrl}?start=${start}&total=${count}`,
      config
    );
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getTotalTip = async () => {
  const req = await axios.get(`${baseUrl}/total`, config);
  return req.data;
};

const approveTip = async (id) => {
  await axios.put(`${baseUrl}/approve?id=${id}`, null, config);
};

const deleteTip = async (id) => {
  const res = await axios.delete(`${baseUrl}/remove?id=${id}`, config);
  return res.data;
};

const postTip = async (tip, setIsLoading, setIsOpen) => {
  try {
    const req = await axios.post(`${baseUrl}`, tip, config);
    setIsOpen(false);
    setIsLoading(false);

    return req.data;
  } catch (e) {
    setIsLoading(false);
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  getTip,
  addInf,
  getTotalTip,
  postTip,
  getAllTips,
  approveTip,
  deleteTip,
};
