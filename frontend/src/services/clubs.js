import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/clubs'
    : '/api/clubs';

const getClub = async () => {
  const req = await axios.get(`${baseUrl}`, config);
  return req.data;
};

const getAllClubs = async () => {
  const req = await axios.get(`${baseUrl}/all`, config);
  return req.data;
};

const deleteClub = async (id) => {
  const res = await axios.delete(`${baseUrl}/remove?id=${id}`, config);
  return res.data;
};

const postClub = async (values, setIsLoading) => {
  const req = await axios.post(`${baseUrl}`, values, config);
  setIsLoading(false);
  return req.data;
};

export default {
  getClub,
  postClub,
  getAllClubs,
  deleteClub,
};
