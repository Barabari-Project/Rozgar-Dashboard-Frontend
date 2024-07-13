// toastHelper.ts
import { toast } from "react-toastify";

export const showSuccessToast = (message: string): void => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "light",
  });
};

export const showErrorToast = (message: string): void => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "light",
  });
};
