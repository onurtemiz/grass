import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/lessons';

const addInf = async (start, count) => {
  const req = await axios.get(`${baseUrl}?start=${start}&total=${count}`);
  return req.data;
};

const getLessonPage = async (areaCode, digitCode, sectionCode) => {
  const req = await axios.get(
    `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&sectionCode=${sectionCode}`
  );
  return req.data;
};

const getTotalLesson = async () => {
  const req = await axios.get(`${baseUrl}/total`);
  return req.data;
};

export default {
  addInf,
  getLessonPage,
  getTotalLesson,
};
