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
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const sawModal = async () => {
  try {
    const res = await axios.put(`${baseUrl}/modal`, null, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const followLesson = async (id) => {
  try {
    const res = await axios.put(`${baseUrl}/follow/${id}`, null, config);

    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const checkAdmin = async (setIsAdmin) => {
  const res = await axios.get(`${baseUrl}/admin`, config);
  setIsAdmin(res.data.isAdmin);
};

const getFollowing = async (setFollowing) => {
  try {
    const res = await axios.get(`${baseUrl}/following`, config);
    setFollowing(res.data);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getNotifications = async (setNotifications, setLoading) => {
  try {
    const res = await axios.get(`${baseUrl}/notifications`, config);
    setNotifications(res.data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    return e.response
      ? e.response.data
      : 'Onur bir şeyleri batırdı. Hata kodu 42';
  }
};

const deleteNotifications = async () => {
  try {
    await axios.delete(`${baseUrl}/notifications`, config);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const unfollowLesson = async (id) => {
  try {
    const res = await axios.put(`${baseUrl}/follow/${id}`, null, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};
const getPopulatedUser = async (username) => {
  try {
    const res = await axios.get(`${baseUrl}/${username}`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getPopulatedMainUser = async () => {
  try {
    const res = await axios.get(`${baseUrl}/mainuser`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const changeIcon = async (iconName, iconCode) => {
  try {
    const res = await axios.put(
      `${baseUrl}/icon?name=${iconName}&iconCode=${iconCode}`,
      null,
      config
    );
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const checkAchievement = async () => {
  try {
    const res = await axios.get(`${baseUrl}/achievement`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  updateUser,
  getPopulatedUser,
  followLesson,
  unfollowLesson,
  checkAdmin,
  getFollowing,
  getNotifications,
  deleteNotifications,
  getPopulatedMainUser,
  changeIcon,
  checkAchievement,
  sawModal,
};
