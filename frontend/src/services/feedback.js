import axios from 'axios';
import { toast } from 'react-toastify';
import { config } from '../utils/token';

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/feedback'
    : '/api/dorms';

const postFeedback = async (body, setLoading) => {
  try {
    const res = await axios.post(`${baseUrl}/post`, body, config);
    if (res.data.error) {
      toast.error(`${res.data.error}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    toast.success(`Feedback gönderilmiştir.`, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (e) {
    toast.error('Onur bir şeyleri batırdı. Hata kodu 445', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } finally {
    setLoading(false);
  }
};

export default {
  postFeedback,
};
