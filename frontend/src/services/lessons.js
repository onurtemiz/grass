import axios from 'axios';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/lessons'
    : '/api/lessons';

const addInf = async (start, count, filter) => {
  const url =
    filter === ''
      ? `${baseUrl}?start=${start}&total=${count}`
      : `${baseUrl}?start=${start}&total=${count}&search=${filter}`;
  const req = await axios.get(url);
  return req.data;
};

const getLessonPageByName = async (areaCode, digitCode, teacherName) => {
  const req = await axios.get(
    `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&teacherName=${teacherName}`
  );
  return req.data;
};

const getLessonPageById = async (areaCode, digitCode, teacherId) => {
  const req = await axios.get(
    `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&teacherId=${teacherId}`
  );
  return req.data;
};

const getTotalLesson = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?search=${filter}`);
  return req.data;
};

export default {
  addInf,
  getLessonPageByName,
  getLessonPageById,
  getTotalLesson,
};
