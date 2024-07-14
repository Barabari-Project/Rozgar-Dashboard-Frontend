import React from "react";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import DashboardMobile from "../pages/dashboard/dashboardMobile/DashboardMobile";
import useMediaQuery from "../utils/hooks/useMediaQuery";

const Route: React.FC = () => {
  const isMobile = useMediaQuery(768);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: isMobile ? <DashboardMobile /> : <Dashboard />,
        }, {
          path: "/sign-up",
          element: <Signup />
        }, {
          path: "/sign-in",
          element: <SignIn />
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Route;

