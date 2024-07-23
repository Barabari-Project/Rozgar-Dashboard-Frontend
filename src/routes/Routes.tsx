import React from "react";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import DashboardMobile from "../pages/dashboard/dashboardMobile/DashboardMobile";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import Lecture from '../pages/lecture/Lecture';
import { HOME, SIGNIN, SIGNUP } from "../constants/routesEndpoints";

const Route: React.FC = () => {
  const isMobile = useMediaQuery(768);

  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      children: [
        {
          path: HOME,
          element: isMobile ? <DashboardMobile /> : <Dashboard />,
        }, {
          path: SIGNUP,
          element: <Signup />
        }, {
          path: SIGNIN,
          element: <SignIn />
        }, {
          path: "/lecture/:sectionId/:moduleId/:topicId",
          element: <Lecture />
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Route;

