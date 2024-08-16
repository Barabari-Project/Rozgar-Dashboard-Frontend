// import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';
import './styles/globals.scss';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Auth0Provider
    domain={import.meta.env.VITE_DOMAIN}
    clientId={import.meta.env.VITE_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider >
  </Auth0Provider>,
  // {/* </React.StrictMode> */}
)
