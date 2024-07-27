import React, { useEffect } from 'react';
import Route from './routes/Routes';
import axiosInstance from './utils/axiosInstance';
import resetEndPoints from "./constants/restEndPoints.json";
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/slices/UserSlice';
import { setError } from './redux/slices/StatusSlice';
import { Action } from './enums/actionEnum';
import axios from 'axios';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axiosInstance.get(`${resetEndPoints.auth}`);
        dispatch(setUserDetails({ ...response.data.user }));
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          dispatch(
            setError({
              statusCode: error.response.status,
              message: error.response.data.error,
              action: Action.AUTH,
            })
          );
        } else {
          alert("Server is Down");
        }
      }
    };
    auth();
  }, []);
  return (
    <>
      <Route />
    </>
  );
};

export default App;
