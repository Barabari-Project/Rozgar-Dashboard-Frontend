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
import { Link } from 'react-router-dom';
import Rozgar_Logo from "../../assets/barabari_logo.png";
import { Phone,BookA, Mail, LandPlot,Lock, MapPin    } from 'lucide-react';


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
        {/* <form onSubmit={handleSubmit}>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
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
              type="number"
              minLength={6}
              maxLength={6}
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
        </form> */}
{/* ---------------------------------------------------------------- */}
    
        <section>
        {/* <div className="grid grid-cols-1 lg:grid-cols-2"> */}



{/* left */}
          <div className="flex mt-5  items-center justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-6 lg:py-8 bg-white">
            <div className=" md:mx-auto md:w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl 2xl:max-w-2xl rounded-xl px-4 py-2 bg-white">
              <div className="mb-2 flex justify-center">
                <img className='h-14' src={Rozgar_Logo} alt="" />
              </div>
              <h2 className="text-center text-2xl font-bold leading-tight text-black">
                Sign up to create account
              </h2>
              
              {/* <p className='text-center text-[#595959]'>Explore the available courses in detail.</p> */}
              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 ">
                <div className="space-y-5">

                   

                  <div className='flex md:flex-row flex-col gap-2'>
                  

                  {/* First Name */}
                  <div className='md:w-1/2'>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      {' '}
                      Full Name{' '}
                    </label>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <BookA />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder='First Name'
                      ></input>
                    </div>
                      
                    </div>
                    {formErrors.firstName && <p className='text-red-500'>{formErrors.firstName}</p>}
                  </div>

                  {/* Last Name */}
                  <div className='md:w-1/2'>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      {' '}
                      Organization{' '}
                    </label>
                    <div className="mt-2">
                      <div
                        className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                      >
                        <span className="flex justify-center items-center gap-2">
                        <BookA />
                        </span>
                        <input
                          className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder='Last Name'
                        ></input>
                      </div>
                    </div>
                    {formErrors.lastName && <p className='text-red-500'>{formErrors.lastName}</p>}
                  </div>
                </div>

                <div className='flex md:flex-row flex-col gap-2'>

                  {/* Email */}
                  <div className='md:w-1/2'>
                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                      {' '}
                      Email address{' '}
                    </label>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <Mail />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email Address'
                      ></input>
                      </div>
                    </div>
                    {formErrors.email && <p className='text-red-500'>{formErrors.email}</p>}
                  </div>


                   {/* Phone Number */}
                   <div className='md:w-1/2'>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      {' '}
                      Mobile Number{' '}
                    </label>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                        <Phone />+91
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder='Mobile Number'
                      />
                    </div>

                    </div>
                    {formErrors.phoneNumber && <p className='text-red-500'>{formErrors.phoneNumber}</p>}
                  </div>  
                </div>  

                <div className='flex md:flex-row flex-col gap-2'>
                  {/* Password */}
                  <div className='md:w-1/2'>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <Lock />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                      ></input>
                      </div>
                    </div>
                    {formErrors.password && <p className='text-red-500 '>{formErrors.password}</p>}
                  </div>


                  {/* Confirm Password */}
                  <div className='md:w-1/2'>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Confirm Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <Lock />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder='Confirm Password'
                      ></input>
                      </div>
                    </div>
                    {formErrors.confirmPassword && <p className='text-red-500'>{formErrors.confirmPassword}</p>}
                  </div>
                </div>
                  
                  

                  {/* university and degree */}
                  <div className='flex md:flex-row flex-col gap-2'>

{/* Email */}
<div className='md:w-1/2'>
  <label htmlFor="email" className="text-base font-medium text-gray-900">
    {' '}
    University{' '}
  </label>
  <div className="mt-2">
  <div
    className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
  >
    <span className="flex justify-center items-center gap-2">
    <Mail />
    </span>
    <input
      className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder='Email Address'
    ></input>
    </div>
  </div>
  {formErrors.email && <p className='text-red-500'>{formErrors.email}</p>}
</div>


 {/* Phone Number */}
 <div className='md:w-1/2'>
  <label htmlFor="name" className="text-base font-medium text-gray-900">
    {' '}
    Degree{' '}
  </label>
  <div className="mt-2">
  <div
    className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
  >
    <span className="flex justify-center items-center gap-2">
      <Phone />+91
    </span>
    <input
      className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      placeholder='Mobile Number'
    />
  </div>

  </div>
  {formErrors.phoneNumber && <p className='text-red-500'>{formErrors.phoneNumber}</p>}
</div>  
</div>  

                  {/* Address Line1 */}
                  {/* <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Address Line 1{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <LandPlot />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        name="address.line1"
                        value={formData.address.line1}
                        onChange={handleChange}
                        placeholder='Address Line 1'
                      ></input>
                      </div>
                    </div>
                    {formErrors.line1 && <p className='text-red-500'>{formErrors.line1}</p>}
                  </div> */}


                  {/* Address Line 2 */}
                  {/* <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Address Line 2{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <LandPlot />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        name="address.line2"
                        value={formData.address.line2 ?? undefined}
                        onChange={handleChange}
                        placeholder='Address Line 2 (Optional)'
                      ></input>
                      </div>
                    </div>
                    {formErrors.line2 && <p className='text-red-500'>{formErrors.line2}</p>}
                  </div> */}

                    {/* City */}
                  {/* <div className='flex md:flex-row flex-col gap-2'>
                  <div className='md:w-1/2'>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        City{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <MapPin />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        placeholder='Enter City'
                      ></input>
                      </div>
                    </div>
                    {formErrors.city && <p className='text-red-500'>{formErrors.city}</p>}
                  </div>
                  
                 
                  
                  <div className='md:w-1/2'>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-base font-medium text-gray-900">
                        {' '}
                        Pincode{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                    <div
                      className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1"
                    >
                      <span className="flex justify-center items-center gap-2">
                      <MapPin />
                      </span>
                      <input
                        className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={handleChange}
                        placeholder='Enter Pincode'
                      ></input>
                      </div>
                    </div>
                    {formErrors.pincode && <p className='text-red-500'>{formErrors.pincode}</p>}
                  </div>
                  </div> */}


                  <div>
                    <button
                      type="submit" 
                      className="inline-flex duration-300 w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 hover:scale-105"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>

              <p className="mt-2 text-center text-base text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/sign-in"
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>
              
            </div>
          </div>

          {/* right */}
          {/* <div className="h-full w-full flex justify-center items-center ">
              <img
                className="mx-auto h-full w-full rounded-md object-cover"
                src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt=""
              />
            </div> */}
          {/* </div> */}
        </section>

      </Error>
    </Loading>
  );
};

export default Signup;
