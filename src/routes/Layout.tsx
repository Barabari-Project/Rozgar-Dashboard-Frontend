import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import axiosInstance from '../utils/axiosInstance';
import restEndPoints from "../constants/restEndPoints.json";
import { useDispatch } from 'react-redux';
import { setError } from '../redux/slices/StatusSlice';
import { Action } from '../enums/actionEnum';


const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const singout = async () => {
    try {
      const response = await axiosInstance.get(restEndPoints.signOut);
      console.log(response);
    } catch (err: any) {
      dispatch(setError({ statusCode: err.response.status, message: err.response.data.error,action: Action.SIGNOUT }));
    }
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
