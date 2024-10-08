import React from "react";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import SignIn from "../pages/signIn/SignIn";
import DashboardMobile from "../pages/dashboard/dashboardMobile/DashboardMobile";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import Lecture from '../pages/lecture/Lecture';
import { HOME, SIGNIN, PROFILE, ASSIGNMENT, DASHBOARD } from "../constants/routesEndpoints";
import Profile from "../pages/profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import RestrictedRoute from "../components/RestrictedRoute";
import Assignment from "../pages/assignment/Assignment";
import Home from "../pages/Home/Home";

const Route: React.FC = () => {
  const isMobile = useMediaQuery(768);

  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      children: [
        {
          path: HOME,
          element: <Home />
        },
        {
          path: DASHBOARD,
          element: <ProtectedRoute>{isMobile ? <DashboardMobile /> : <Dashboard />}</ProtectedRoute>,
        }, {
          path: SIGNIN,
          element: <RestrictedRoute> <SignIn /> </RestrictedRoute>,
        }, {
          path: "/lecture/:sectionId/:moduleId/:topicId",
          element: <ProtectedRoute> <Lecture /> </ProtectedRoute>
        }, {
          path: PROFILE,
          element: <ProtectedRoute> <Profile /></ProtectedRoute>
        }, {
          path: ASSIGNMENT,
          element: <ProtectedRoute> <Assignment /></ProtectedRoute>
        }

      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Route;

