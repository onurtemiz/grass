import axios from 'axios';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/events'
    : '/api/events';

const addInf = async (start, total, filter, daySort) => {
  try {
    const res = await axios.get(
      `${baseUrl}/inf?start=${start}&total=${total}&filter=${filter}&day_sort=${daySort}`,
      config
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const postEvent = async (postData, reset, setLoading, setOpen) => {
  try {
    await axios.post(`${baseUrl}/add_event/`, postData, config);
    reset();
    setLoading(false);
    setOpen(false);
  } catch (e) {
    setLoading(false);
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const approveEvent = async (id) => {
  try {
    await axios.put(`${baseUrl}/approve_event?id=${id}`, null, config);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const removeEvent = async (id) => {
  try {
    await axios.delete(`${baseUrl}/remove_event?id=${id}`, config);
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

const getAllEvents = async () => {
  try {
    const res = await axios.get(`${baseUrl}/all_events`, config);
    return res.data;
  } catch (e) {
    return e.response
      ? e.response.data
      : { error: 'Onur bir şeyleri batırdı. Hata kodu 42' };
  }
};

export default {
  addInf,
  postEvent,
  approveEvent,
  getAllEvents,
  removeEvent,
};
