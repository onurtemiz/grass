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

const getAllQuestions = async () => {
  const res = await axios.get(`${baseUrl}/all`, config);
  return res.data;
};

const approveQuestion = async (id) => {
  await axios.put(`${baseUrl}/${id}`, null, config);
};

const removeQuestion = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
};

const editApproveQuestion = async (question) => {
  const res = await axios.put(`${baseUrl}/ea/${question.id}`, question, config);
  return res.data;
};

const postQuestion = async (values, reset, setLoading, setOpen) => {
  await axios.post(`${baseUrl}`, values, config);
  reset();
  setLoading(false);
  setOpen(false);
};

export default {
  getQuestionById,
  postQuestion,
  removeQuestion,
  editApproveQuestion,
  addInf,
  approveQuestion,
  getAllQuestions,
};
