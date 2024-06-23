import { toast, ToastOptions } from "react-toastify";
import { NoticeType } from './types';


export const displayNotice = (message: string, noticeType: NoticeType = 'error'): void => {
  if (!message || typeof message !== 'string') {
    return;
  }

  const options: ToastOptions = {
    toastId: `${noticeType}${message.replace(/\s/g, '')}`,
  };

  switch (noticeType) {
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    default:
      toast.error(message, options);
  }
};

export const confirmWrapper = (callback: Function, message = 'Are you sure?') => {
  if (confirm(message)) {
    void callback();
  }
};
