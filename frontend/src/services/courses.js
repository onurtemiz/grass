import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/courses'
    : '/api/courses';

const searchCourse = async (search, findTime, notFindTime) => {
  try {
    const url =
      findTime.length > 0 && notFindTime.length > 0
        ? `${baseUrl}/search?q=${search}&t=${findTime}&nt=${notFindTime}`
        : findTime.length > 0
        ? `${baseUrl}/search?q=${search}&t=${findTime}`
        : notFindTime.length > 0
        ? `${baseUrl}/search?q=${search}&nt=${notFindTime}`
        : `${baseUrl}/search?q=${search}`;
    const res = await axios.get(url, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};
export default {
  searchCourse,
};
