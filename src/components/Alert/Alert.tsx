import React from 'react';
import { toast, ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type NotifyFunction = (message: string, options?: any) => void;

const options: any = {
   position: 'top-right',
   autoClose: 3000,
   hideProgressBar: true,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
};
const notify: {
   success: NotifyFunction;
   error: NotifyFunction;
   info: NotifyFunction;
   warning: NotifyFunction;
} = {
   success: (message) => toast.success(message, options),
   error: (message) => toast.error(message, options),
   info: (message) => toast.info(message, options),
   warning: (message) => toast.warning(message, options),
};

// Export ToastContainer
export const ToastContainer: React.FC = () => (
   <ReactToastContainer autoClose={3000} />
);

export default notify;
