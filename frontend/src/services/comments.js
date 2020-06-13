import axios from 'axios';
import { config } from '../utils/token';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/comments'
    : '/api/comments';

const updateComment = async (comment, id) => {
  const req = await axios.put(`${baseUrl}/${id}`, { comment }, config);
  return req.data;
};

const removeComment = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
};

const likeComment = async (id) => {
  const req = await axios.put(`${baseUrl}/${id}`, null, config);
  return req.data;
};

const postComment = async (comment) => {
  const req = await axios.post(baseUrl, { ...comment }, config);
  return req.data;
};

const getTotalCommentsById = async (id) => {
  const req = await axios.get(`${baseUrl}/total?id=${id}`, config);
  return req.data;
};

const getTotalCommentsAll = async () => {
  const req = await axios.get(`${baseUrl}/total`, config);
  return req.data;
};

const getTotalCommentsFeed = async () => {
  const res = await axios.get(`${baseUrl}/feed/total`, config);
  return res.data;
};

const addInfCommentsFeed = async (start, count, filter) => {
  const res = await axios.get(
    `${baseUrl}/feed?start=${start}&total=${count}&filter=${filter}`,
    config
  );
  return res.data;
};

const addInfCommentsAll = async (start, count, filter) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&filter=${filter}`,
    config
  );
  return req.data;
};

const getCommentById = async (id) => {
  const res = await axios.get(`${baseUrl}?id=${id}`, config);
  return res.data;
};

const addInfCommentsById = async (start, count, id, filter) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&id=${id}&filter=${filter}`,
    config
  );
  return req.data;
};

const allComments = async () => {
  const req = await axios.get(baseUrl, config);
  return req.data;
};

export default {
  allComments,
  removeComment,
  likeComment,
  updateComment,
  postComment,
  addInfCommentsAll,
  getTotalCommentsAll,
  addInfCommentsById,
  getTotalCommentsById,
  getTotalCommentsFeed,
  addInfCommentsFeed,
  getCommentById,
};
