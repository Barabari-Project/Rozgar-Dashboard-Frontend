import { ChangeEvent, FormEvent, useState } from "react";
import { ISignInForm } from "../../utils/types/form";
import { IValidationErrors } from "../../utils/types/error";
import { validateSignInForm } from "../../utils/validations/validateSignInForm";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../redux/slices/StatusSlice";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { setUserDetails } from "../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { Action } from "../../enums/actionEnum";
import restEndPoints from "../../constants/restEndPoints.json";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ISignInForm>({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState<IValidationErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const tempErrors: IValidationErrors = validateSignInForm(formData);
        if (Object.keys(tempErrors).length === 0) {
            setFormErrors({});
            dispatch(setLoading(true))
            try {
                const response = await axiosInstance.post(restEndPoints.signIn, formData);
                toast.success(response.data.message);
                Cookies.set('token', response.data.token);
                dispatch(setUserDetails({ ...response.data.user }));
                navigate('/dashboard');
            } catch (error: any) {
                if (error.response) {
                    dispatch(setError({
                        statusCode: error.response.status,
                        message: error.response.data.error,
                        action: Action.SIGNIN
                    }));
                }else{
                    alert('Server is Down');
                }
            } finally {
                dispatch(setLoading(false));
            }
        } else {
            setFormErrors(tempErrors);
        }
    }

    return (
        <Loading>
            <Error>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <p>{formErrors.email}</p>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {formErrors.password && <p>{formErrors.password}</p>}
                    </div>
                    <div>
                        <button type="submit" >
                            Submit
                        </button>
                    </div>
                </form>
            </Error>
        </Loading>
    );
}

export default SignIn;