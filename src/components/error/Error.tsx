import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IBackEndError } from '../../utils/types/error';
import { Action } from '../../enums/actionEnum';
import { SIGNIN } from '../../constants/routesEndpoints';
import { clearError } from '../../redux/slices/StatusSlice';

interface ErrorProps {
    children: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ children }) => {
    const error: IBackEndError = useSelector((state: RootState) => state.status.error);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(error);
        if (error) {
            toast.error(error.message);
            if (401 == error.statusCode) {
                navigate(SIGNIN)
            } else if (error.action === Action.SIGNUP) {
                if (409 == error.statusCode) {
                    navigate(SIGNIN);
                }
            } else if (error.action === Action.SIGNIN || error.action === Action.AUTH) {
                if (404 == error.statusCode) {
                    navigate('/sign-up');
                }
            }
            dispatch(clearError());
        }
    }, [error])

    return <>{children}</>;
};

export default Error;
