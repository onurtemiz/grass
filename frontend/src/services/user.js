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

const getNotifications = async (setLoading) => {
  try {
    const res = await axios.get(`${baseUrl}/notifications`, config);
    setLoading(false);
    return res.data;
  } catch (e) {
    if (
      e.response &&
      e.response.data &&
      e.response.data.error === 'Onur bir şeyleri batırdı. Hata kodu 11'
    ) {
      window.localStorage.removeItem('grassUser');
      window.location.reload();
    } else {
      setLoading(false);
      return e.response
        ? e.response.data
        : 'Onur bir şeyleri batırdı. Hata kodu 42';
    }
  }
};

const deleteNotifications = async () => {
  try {
    await axios.delete(`${baseUrl}/notifications?all=true`, config);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const deleteNotification = async (id) => {
  try {
    await axios.delete(`${baseUrl}/notifications?id=${id}`, config);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const seenNotification = async (id) => {
  try {
    await axios.put(`${baseUrl}/notifications/seen?id=${id}`, null, config);
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
    const res = await axios.get(`${baseUrl}/u/${username}`, config);
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

const getAchievement = async () => {
  try {
    const res = await axios.get(`${baseUrl}/achievement/get`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const checkAchievement = async () => {
  try {
    const res = await axios.get(`${baseUrl}/achievement/`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const followCourse = async (courseId) => {
  try {
    const res = await axios.post(
      `${baseUrl}/quota/follow?courseId=${courseId}`,
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

const updateDepSemInfo = async (data, setIsLoading) => {
  try {
    const res = await axios.post(`${baseUrl}/depsem_info/update`, data, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  } finally {
    setIsLoading(false);
  }
};

export default {
  updateUser,
  getPopulatedUser,
  followLesson,
  unfollowLesson,
  checkAdmin,
  getAchievement,
  getFollowing,
  getNotifications,
  deleteNotifications,
  changeIcon,
  checkAchievement,
  sawModal,
  deleteNotification,
  seenNotification,
  updateDepSemInfo,
  followCourse,
};
