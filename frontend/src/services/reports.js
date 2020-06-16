import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/reports'
    : '/api/reports';

const getAllReports = async () => {
  const req = await axios.get(`${baseUrl}/all`, config);
  return req.data;
};

const destroyComment = async (id) => {
  await axios.put(`${baseUrl}/destroy?id=${id}`, null, config);
};

const hideComment = async (id) => {
  await axios.put(`${baseUrl}/hide?id=${id}`, null, config);
};

const deleteReport = async (id) => {
  const res = await axios.delete(`${baseUrl}/remove?id=${id}`, config);
  return res.data;
};

const postReport = async (report, setIsLoading, setIsOpen, setIsReported) => {
  try {
    const req = await axios.post(`${baseUrl}`, report, config);
    setIsOpen(false);
    setIsReported(true);
    setIsLoading(false);

    return req.data;
  } catch (e) {
    setIsLoading(false);
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  getAllReports,
  deleteReport,
  destroyComment,
  postReport,
  hideComment,
};
