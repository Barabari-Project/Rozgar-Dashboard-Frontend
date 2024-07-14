import React from "react";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/SignUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import LectureDashboard from '../pages/Lecture/LectureDashboard';

const Route: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        }, {
          path: "/sign-up",
          element: <Signup />
        }, {
          path: "/sign-in",
          element: <SignIn />
        },{
          // path: "/lecture/:moduleId/:topicId",
          path: "/lecture",
          element: <LectureDashboard />
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Route;

