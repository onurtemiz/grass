import axios from 'axios';
const baseUrl = '/api/teachers';

const addInf = async (start, count, filter) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&result=${filter}`
  );
  return req.data;
};

const getTeacherPage = async (name) => {
  const req = await axios.get(`${baseUrl}?name=${name}`);
  return req.data;
};

const getTotalTeacher = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?result=${filter}`);
  return req.data;
};

export default {
  addInf,
  getTeacherPage,
  getTotalTeacher,
};
