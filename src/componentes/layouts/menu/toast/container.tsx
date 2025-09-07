'use client';


import { ToastContainer } from 'react-toastify';

export function ToastProvider() {


  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    //theme={theme === 'dark' ? 'dark' : 'light'}
    />
  );
}