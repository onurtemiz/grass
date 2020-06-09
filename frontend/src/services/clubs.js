import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/clubs'
    : '/api/clubs';

const getTotal = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?search=${filter}`, config);
  return req.data;
};

const getClubPageByName = async (shortName) => {
  const req = await axios.get(`${baseUrl}/${shortName}`, config);
  return req.data;
};

const addInf = async (start, count, filter) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&search=${filter}`,
    config
  );
  return req.data;
};

const postClub = async (values) => {
  const req = await axios.post(`${baseUrl}`, values, config);
  return req.data;
};

const editClub = async (club) => {
  console.log('club', club);
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
