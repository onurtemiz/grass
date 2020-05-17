import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/comments';

let config = {
  headers: { Authorization: null },
};

const setToken = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` },
  };
};

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

const getTotalCommentsTeacher = async (teacherId) => {
  const req = await axios.get(`${baseUrl}/total?teacherId=${teacherId}`);
  return req.data;
};

const getTotalCommentsLesson = async (lessonId) => {
  const req = await axios.get(`${baseUrl}/total?lessonId=${lessonId}`);
  return req.data;
};

const addInfTeacher = async (start, count, teacherId) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&teacherId=${teacherId}`
  );
  return req.data;
};

const addInfLesson = async (start, count, lessonId) => {
  const req = await axios.get(
    `${baseUrl}?start=${start}&total=${count}&lessonId=${lessonId}`
  );
  return req.data;
};

const allComments = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

export default {
  allComments,
  removeComment,
  likeComment,
  setToken,
  updateComment,
  postComment,
  getTotalCommentsTeacher,
  getTotalCommentsLesson,
  addInfTeacher,
  addInfLesson,
};
