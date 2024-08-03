import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { SIGNIN } from "../constants/routesEndpoints";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useSelector((state: RootState) => state.user);
    const location = useLocation();
    console.log(user);
    if (!user) {
        return <Navigate to={SIGNIN} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
