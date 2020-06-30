import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/courses'
    : '/api/courses';

const searchCourse = async (search, findTime) => {
  try {
    const res = await axios.get(
      `${baseUrl}/search?q=${search}&t=${findTime}`,
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
  searchCourse,
};
