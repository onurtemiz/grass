import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/lessons'
    : '/api/lessons';

const addInf = async (start, count, filter) => {
  const url =
    filter === ''
      ? `${baseUrl}?start=${start}&total=${count}`
      : `${baseUrl}?start=${start}&total=${count}&search=${filter}`;
  const req = await axios.get(url, config);
  return req.data;
};

const getLessonPageByName = async (areaCode, digitCode, teacherName) => {
  const req = await axios.get(
    `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&teacherName=${teacherName}`,
    config
  );
  return req.data;
};

const getLessonById = async (id) => {
  const req = await axios.get(`${baseUrl}/${id}`, config);
  return req.data;
};

const getLessonPageById = async (areaCode, digitCode, teacherId) => {
  const req = await axios.get(
    `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&teacherId=${teacherId}`,
    config
  );
  return req.data;
};

const getTotalLesson = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?search=${filter}`, config);
  return req.data;
};

export default {
  addInf,
  getLessonPageByName,
  getLessonPageById,
  getTotalLesson,
  getLessonById,
};
