import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IBackEndError } from '../../utils/types/error';
import { Action } from '../../enums/actionEnum';

interface ErrorProps {
    children: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ children }) => {
    const error: IBackEndError = useSelector((state: RootState) => state.status.error);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error.message);
            if (401 == error.statusCode) {
                navigate('/sign-in')
            } else if (error.action === Action.SIGNUP) {
                if (409 == error.statusCode) {
                    navigate('/sign-in');
                }
            } else if (error.action === Action.SIGNIN) {
                if (404 == error.statusCode) {
                    navigate('/sign-up');
                }
            }
        }
    }, [error])

    return <>{children}</>;
};

export default Error;
