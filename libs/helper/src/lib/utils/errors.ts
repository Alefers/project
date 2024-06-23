import { isAxiosError } from 'axios';
import { displayNotice } from './notifications';


export const handleApiResponseError = (error: unknown, showNotice = true): string => {
  let message;
  if (isAxiosError(error)) {
    const { response, code } = error || {};
    if (code === 'ERR_CANCELED') {
      return '';
    }
    const { data, status } = response || {};
    if (data && status && status >= 400 && status < 500) {
      message = data.message;
    }
  } else {
    if (error instanceof Error) {
      message = error.message;
    }
    if (typeof error === 'string') {
      message = error;
    }
  }
  const final = message || 'Something went wrong';

  if (showNotice) {
    displayNotice(final);
  }

  return final;
}
