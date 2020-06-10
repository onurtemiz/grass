import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/questions'
    : '/api/questions';

const getQuestionById = async (id) => {
  const req = await axios.get(`${baseUrl}/${id}`, config);
  return req.data;
};

const addInf = async (start, count, filter) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&search=${filter}`,
    config
  );
  return req.data;
};

const postQuestion = async (
  values,
  setQuestion,
  setDescription,
  setLoading
) => {
  await axios.post(`${baseUrl}`, values, config);
  setQuestion('');
  setDescription('');
  setLoading(false);
};

const approveQuestion = async (id) => {
  await axios.put(`${baseUrl}/${id}`, null, config);
};

export default {
  getQuestionById,
  postQuestion,
  addInf,
  approveQuestion,
};
