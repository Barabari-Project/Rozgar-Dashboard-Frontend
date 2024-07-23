import React from "react";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/SignUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import DashboardMobile from "../pages/dashboard/dashboardMobile/DashboardMobile";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import Lecture from '../pages/lecture/Lecture';
import { HOME, SIGNIN, SIGNUP, PROFILE } from "../constants/routesEndpoints";
import Profile from "../pages/profile/Profile";

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
        }, {
          path: PROFILE,
          element: <Profile />
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Route;

