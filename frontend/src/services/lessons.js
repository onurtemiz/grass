import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/lessons';

const addInf = async (start, count, filter) => {
  const url =
    filter === ''
      ? `${baseUrl}?start=${start}&total=${count}`
      : `${baseUrl}?start=${start}&total=${count}&result=${filter}`;
  const req = await axios.get(url);
  return req.data;
};

const getLessonPage = async (areaCode, digitCode, sectionCode) => {
  const req = await axios.get(
    `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&sectionCode=${sectionCode}`
  );
  return req.data;
};

const getTotalLesson = async (filter) => {
  const req = await axios.get(`${baseUrl}/total?search=${filter}`);
  return req.data;
};

export default {
  addInf,
  getLessonPage,
  getTotalLesson,
};
