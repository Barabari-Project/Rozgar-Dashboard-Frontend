import React, { useState, ChangeEvent, FormEvent } from 'react';
import restEndPoints from "../../constants/restEndPoints.json";
import { ISignUpForm } from '../../utils/types/form';
import { IValidationErrors } from '../../utils/types/error';
import { validateSignUpForm } from '../../utils/validations/validateSignUpForm';
import { sanitizeSignUpFormData } from '../../utils/sanitizeData/sanitizeSignUpFormData';
import axiosInstance from '../../utils/axiosInstance';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { useDispatch } from 'react-redux';
import { Action } from '../../enums/actionEnum';
import { setError, setLoading } from '../../redux/slices/StatusSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { setUserDetails } from '../../redux/slices/UserSlice';
import { useNavigate } from 'react-router-dom';
// import { setError } from '../../redux/slices/statusSlice';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<ISignUpForm>({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      line1: '',
      line2: null,
      city: '',
      pincode: ''
    }
  });

  const [formErrors, setFormErrors] = useState<IValidationErrors>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const addressField = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const sanitizedFormData = sanitizeSignUpFormData(formData);
    setFormData(sanitizedFormData);
    const tempErrors: IValidationErrors = validateSignUpForm(sanitizedFormData);

    if (Object.keys(tempErrors).length === 0) {
      dispatch(setLoading(true))
      try {
        const response = await axiosInstance.post(restEndPoints.signUp, sanitizedFormData);
        toast.success(response.data.message);
        Cookies.set('token', response.data.token);
        dispatch(setUserDetails({ ...response.data.user }));
        navigate('/dashboard');
      } catch (error: any) {
        dispatch(setError({
          statusCode: error.response.status,
          message: error.response.data.error,
          action: Action.SIGNUP
        }));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      setFormErrors(tempErrors);
    }

  };

  return (
    <Loading>
      <Error>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {formErrors.firstName && <p>{formErrors.firstName}</p>}
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName && <p>{formErrors.lastName}</p>}
          </div>
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
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
          </div>
          <div>
            <label>Address Line 1:</label>
            <input
              type="text"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleChange}
            />
            {formErrors.line1 && <p>{formErrors.line1}</p>}
          </div>
          <div>
            <label>Address Line 2:</label>
            <input
              type="text"
              name="address.line2"
              value={formData.address.line2 ?? undefined}
              onChange={handleChange}
            />
            {formErrors.line2 && <p>{formErrors.line2}</p>}
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
            {formErrors.city && <p>{formErrors.city}</p>}
          </div>
          <div>
            <label>Pincode:</label>
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
            />
            {formErrors.pincode && <p>{formErrors.pincode}</p>}
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
};

export default Signup;
