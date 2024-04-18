import { toast } from 'react-toastify';

import { toastErrorMessage } from '@/constants/toastMessage';

export const createToast = (id: string, message: string) =>
  toast(message, {
    toastId: id,
    autoClose: false,
  });

export const successToast = (id: string, message: string) =>
  toast.update(id, { render: message, type: 'success', autoClose: 1500 });

export const errorToast = (id: string, message: string) =>
  toast.update(id, {
    render: toastErrorMessage(message),
    type: 'error',
    autoClose: 1500,
  });
