import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/tips'
    : '/api/tips';

const getTip = async () => {
  const req = await axios.get(`${baseUrl}`, config);
  return req.data;
};

const getAllTips = async () => {
  const req = await axios.get(`${baseUrl}/all`, config);
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
  const req = await axios.post(`${baseUrl}`, tip, config);
  setIsLoading(false);
  setIsOpen(false);
  return req.data;
};

export default {
  getTip,
  postTip,
  getAllTips,
  approveTip,
  deleteTip,
};
