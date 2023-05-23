import {
  errorNotification,
  successNotification,
} from '@scrib/web/lib/notification';
import { redirectToErrorPage } from '@scrib/web/utils/redirect-to-error-page';
import Axios from 'axios';

export const axios = Axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const data = error?.response?.data;
    const message = data?.message || data?.error?.message || error.message;

    // token expired
    if (typeof window !== 'undefined' && error?.response?.status === 401) {
      redirectToErrorPage({
        title: 'Session Expired',
        description: message || 'Your session has expired. Please login again.',
        redirect: location.pathname + location.search,
      });
      return;
    }

    if (typeof window !== 'undefined' && error?.response?.status === 403) {
      redirectToErrorPage({
        title: 'Unauthorized',
        description: message || 'You are not authorized to access this page.',
        redirect: location.pathname + location.search,
      });
      return;
    }

    if (message) {
      const isError = error.response?.status >= 400;
      if (isError)
        errorNotification(
          error.response?.status < 500 && error.response?.status !== 429
            ? message
            : 'We are experiencing an unexpected rise in traffic. Please try again later.'
        );
      else successNotification(message);
    }

    return error;
  }
);
