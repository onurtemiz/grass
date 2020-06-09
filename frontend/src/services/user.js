import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/users'
    : '/api/users';

const updateUser = async (user) => {
  try {
    const res = await axios.put(baseUrl, user, config);
    return res.data;
  } catch (e) {
    return { error: 'Şu anki şifre yanlış' };
  }
};

const followLesson = async (id) => {
  const res = await axios.put(`${baseUrl}/follow/`, { id }, config);

  return res.data;
};

const checkAdmin = async (setIsAdmin) => {
  const res = await axios.get(`${baseUrl}/admin`, config);
  console.log('res.data', res.data);
  setIsAdmin(res.data.isAdmin);
};

const getUserById = async (id) => {
  const res = await axios.get(`${baseUrl}?id=${id}`);
  return res.data;
};

const getFollowing = async () => {
  const res = await axios.get(`${baseUrl}/following`, config);
  return res.data;
};

const unfollowLesson = async (id) => {
  const res = await axios.put(`${baseUrl}/follow/`, { id }, config);
  return res.data;
};
const getPopulatedUser = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`);
  return res.data;
};

export default {
  updateUser,
  getPopulatedUser,
  followLesson,
  unfollowLesson,
  checkAdmin,
  getUserById,
  getFollowing,
};
