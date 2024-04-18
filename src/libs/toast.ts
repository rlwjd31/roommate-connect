import { toast, Flip, ToastOptions } from 'react-toastify';

import { toastErrorMessage } from '@/constants/toastMessage';

export const createToast = (
  id: string,
  message: string,
  options?: ToastOptions,
) =>
  toast(message, {
    toastId: id,
    autoClose: false,
    isLoading: true,
    ...options,
  });

export const successToast = (id: string, message: string) =>
  toast.update(id, {
    render: message,
    delay: 500,
    type: 'success',
    autoClose: 1500,
    transition: Flip,
    isLoading: false,
  });

export const errorToast = (id: string, message: string) =>
  toast.update(id, {
    render: toastErrorMessage(message),
    delay: 500,
    type: 'error',
    autoClose: 1500,
    transition: Flip,
    isLoading: false,
  });
