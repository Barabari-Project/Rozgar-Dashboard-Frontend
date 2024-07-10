import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface LoadingProps {
    children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
    const loading = useSelector((state: RootState) => state.status.loading);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default Loading;
