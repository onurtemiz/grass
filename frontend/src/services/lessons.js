import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/lessons'
    : '/api/lessons';

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

const getLessonPageByName = async (areaCode, digitCode, teacherName) => {
  try {
    const req = await axios.get(
      `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&teacherName=${teacherName}`,
      config
    );
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getLessonById = async (id) => {
  try {
    const req = await axios.get(`${baseUrl}/${id}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getLessonPageById = async (areaCode, digitCode, teacherId) => {
  try {
    const req = await axios.get(
      `${baseUrl}?areaCode=${areaCode}&digitCode=${digitCode}&teacherId=${teacherId}`,
      config
    );
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getTotalLesson = async (filter) => {
  try {
    const req = await axios.get(`${baseUrl}/total?search=${filter}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  addInf,
  getLessonPageByName,
  getLessonPageById,
  getTotalLesson,
  getLessonById,
};
