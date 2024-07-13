import React from 'react';
import Route from './routes/Routes';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <Route />
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
