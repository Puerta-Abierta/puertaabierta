import { toast } from 'react-toastify';

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const showInfo = (message: string) => {
    toast.info(message);
  };

  const showWarning = (message: string) => {
    toast.warning(message);
  };

  const showCustom = (message: string, options?: any) => {
    toast(message, options);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showCustom,
  };
};
