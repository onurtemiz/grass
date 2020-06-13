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
  const res = await axios.get(`${baseUrl}?id=${id}`, config);
  return res.data;
};

const getFollowing = async (setFollowing) => {
  const res = await axios.get(`${baseUrl}/following`, config);
  setFollowing(res.data);
};

const getNotifications = async (setNotifications, setLoading) => {
  const res = await axios.get(`${baseUrl}/notifications`, config);
  setNotifications(res.data);
  setLoading(false);
};

const deleteNotifications = async () => {
  await axios.delete(`${baseUrl}/notifications`, config);
};

const unfollowLesson = async (id) => {
  const res = await axios.put(`${baseUrl}/follow/`, { id }, config);
  return res.data;
};
const getPopulatedUser = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`, config);
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
  getNotifications,
  deleteNotifications,
};
