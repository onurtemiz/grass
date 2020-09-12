import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/courses'
    : '/api/courses';

const addInf = async (
  start,
  count,
  search,
  findTime,
  notFindTime,
  isOffline
) => {
  try {
    const url =
      findTime.length > 0 && notFindTime.length > 0
        ? `${baseUrl}/search?start=${start}&total=${count}&search=${search}&t=${findTime}&nt=${notFindTime}&of=${isOffline}`
        : findTime.length > 0
        ? `${baseUrl}/search?start=${start}&total=${count}&search=${search}&t=${findTime}&of=${isOffline}`
        : notFindTime.length > 0
        ? `${baseUrl}/search?start=${start}&total=${count}&search=${search}&nt=${notFindTime}&of=${isOffline}`
        : `${baseUrl}/search?start=${start}&total=${count}&search=${search}&of=${isOffline}`;
    const res = await axios.get(url, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getSectionsByLesson = async (lesson) => {
  try {
    const res = await axios.get(
      `${baseUrl}/lesson?areaCode=${lesson.areaCode}&digitCode=${lesson.digitCode}&parent=${lesson.parentName}`,
      config
    );
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getCoursesByUser = async () => {
  try {
    const res = await axios.get(`${baseUrl}/user`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const quotaUpdate = async (course, setLoading) => {
  try {
    const res = await axios.get(
      `${baseUrl}/update?course=${course.id}`,
      config
    );
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  } finally {
    setLoading(false);
  }
};

const getAllSections = async (areaCode, digitCode) => {
  try {
    const res = await axios.get(
      `${baseUrl}/allsections?areaCode=${areaCode}&digitCode=${digitCode}`,
      config
    );
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};
export default {
  addInf,
  getAllSections,
  getSectionsByLesson,
  getCoursesByUser,
  quotaUpdate,
};
