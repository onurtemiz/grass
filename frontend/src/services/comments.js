import axios from 'axios';
import { config } from '../utils/token';
const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/comments'
    : '/api/comments';

const updateComment = async (comment, id) => {
  try {
    const req = await axios.put(`${baseUrl}/${id}`, { comment }, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const removeComment = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const likeComment = async (id) => {
  try {
    const req = await axios.put(`${baseUrl}/${id}`, null, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const postComment = async (comment) => {
  try {
    const req = await axios.post(baseUrl, { ...comment }, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getTotalCommentsById = async (id) => {
  try {
    const req = await axios.get(`${baseUrl}/total?id=${id}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getTotalCommentsAll = async () => {
  try {
    const req = await axios.get(`${baseUrl}/total`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getTotalCommentsFeed = async () => {
  try {
    const res = await axios.get(`${baseUrl}/feed/total`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const addInfCommentsFeed = async (start, count, filter, daySort) => {
  try {
    const res = await axios.get(
      `${baseUrl}/feed?start=${start}&total=${count}&filter=${filter}&day=${daySort}`,
      config
    );
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const addInfCommentsAll = async (start, count, filter, daySort) => {
  try {
    const req = await axios.get(
      `${baseUrl}?start=${start}&total=${count}&filter=${filter}&day=${daySort}`,
      config
    );
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getCommentById = async (id, setComment) => {
  try {
    const res = await axios.get(`${baseUrl}?id=${id}`, config);
    setComment(res.data);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const addInfCommentsById = async (start, count, id, filter, daySort) => {
  try {
    const req = await axios.get(
      `${baseUrl}?start=${start}&total=${count}&id=${id}&filter=${filter}&day=${daySort}`,
      config
    );
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const allComments = async (daySort) => {
  try {
    const req = await axios.get(`${baseUrl}?day=${daySort}`, config);
    return req.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
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
