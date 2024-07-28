import React, { useEffect } from 'react';
import Route from './routes/Routes';
import axiosInstance from './utils/axiosInstance';
import resetEndPoints from "./constants/restEndPoints.json";
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/slices/UserSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axiosInstance.get(`${resetEndPoints.auth}`);
        dispatch(setUserDetails({ ...response.data.user }));
      } catch (error: any) {
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
