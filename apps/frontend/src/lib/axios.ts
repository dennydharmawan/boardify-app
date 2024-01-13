import Axios, { HttpStatusCode } from 'axios';

import { CONFIG } from '@/config';
import history from '@/lib/history';

export const axios = Axios.create({
  baseURL: CONFIG.app.apiUrl,
  withCredentials: true
});

// axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Ignore this error message, instead we handle react-query errors
    // const message = error.response?.data?.message || error.message;
    // notifications.show({
    //   title: 'Error',
    //   message,
    //   color: 'error'
    // });

    // redirect to login page for unauthorized users
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      if (history.location.pathname !== '/') {
        history.push('/', { from: history.location.pathname });
      }

      return Promise.resolve();
    }

    return Promise.reject(error);
  }
);
