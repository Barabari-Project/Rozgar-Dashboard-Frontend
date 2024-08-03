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
import Rozgar_Logo from "../../assets/barabari_logo.png";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { HOME } from "../../constants/routesEndpoints";

const myStyle = {
  background: "radial-gradient(circle, rgba(181,189,227,1) 0%, rgba(50,68,152,1) 40%)",
};

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ISignInForm>({
    phoneNumber: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<IValidationErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tempErrors: IValidationErrors = validateSignInForm(formData);
    if (Object.keys(tempErrors).length === 0) {
      setFormErrors({});
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.post(
          restEndPoints.signIn,
          { user: formData }
        );
        toast.success(response.data.message);
        Cookies.set("token", response.data.token);
        dispatch(setUserDetails({ ...response.data.user }));
        navigate(HOME);
        console.log(response)
      } catch (error: any) {
        if (error.response) {
          dispatch(
            setError({
              statusCode: error.response.status,
              message: error.response.data.error,
              action: Action.SIGNIN,
            })
          );
        } else {
          alert("Server is Down");
        }
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
        <section  style={{ height: 'calc(100vh - 60px)' }} className="flex items-start justify-center overflow-y-auto ">
          <div style={{boxShadow: "0px 0px 15px #97a5e6"}} className="grid grid-cols-1 lg:grid-cols-2 m-5 rounded-2xl lg:overflow-hidden lg:shadow-xl">
            {/* left */}
            <div
              style={myStyle}
              className=" h-full text-white w-full hidden lg:flex flex-col justify-start items-center px-10 py-12"
            >
              {/* <img
                className="mx-auto h-full w-full rounded-md object-cover p-5"
                src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt=""
              /> */}
              <h1 className="text-center text-white text-6xl font-bold mb-6">
                Welcome to our Community
              </h1>
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit,
                atque?
              </p>
              <div className="h-1/2 w-1/2 border border-black"></div>
              <h2 className="text-4xl">Make your dreams</h2>
              <h2 className="text-4xl">comes true</h2>
              <p className="mt-4">Quality experience on all devices</p>
            </div>

            {/* right */}
            <div className="flex items-center justify-center px-4 py-1 sm:px-6 sm:py-4 lg:px-8 lg:py-10 ">
              <div className="xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-lg rounded-xl px-6 py-6 md:py-8 ">
                <div className="mb-2 flex justify-center">
                  <img className="h-14" src={Rozgar_Logo} alt="Rozgar" />
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                  Sign in to Rozgar
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 ">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/sign-up"
                    title=""
                    className="font-semibold text-black transition-all duration-200 hover:underline"
                  >
                    Create a free account
                  </Link>
                </p>
                <form onSubmit={handleSubmit} className="sm:mt-6 md:mt-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Phone Number{" "}
                      </label>
                      <div className="mt-2">
                        <div className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1">
                          <span className="flex justify-center items-center gap-2">
                            <Mail />
                          </span>
                          <input
                            className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="tel"
                            name="phoneNumber"
                            placeholder="Email"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                          ></input>
                        </div>
                        {formErrors.phoenNumber && (
                          <p className="text-red-400 mt-1 duration-500">
                            {formErrors.phoenNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-start">
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Password{" "}
                        </label>
                      </div>

                      <div className="mt-2">
                        <div className="flex gap-1 rounded-md px-2 border border-gray-300 focus-within:border-blue-500 focus:ring-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-1">
                          <span className="flex justify-center items-center gap-2">
                            <Lock />
                          </span>
                          <input
                            className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                          ></input>
                        </div>
                        {formErrors.password && (
                          <p className="text-red-400 mt-1 duration-500">
                            {formErrors.password}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <a
                        href="#"
                        title=""
                        className="text-sm font-semibold text-black hover:underline hover:scale-105"
                      >
                        {" "}
                        Forgot password?{" "}
                      </a>
                    </div>
                    <div>
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="group inline-flex w-full items-center justify-center rounded-md bg-[#324498] px-3.5 py-2.5 font-semibold leading-7 text-white  duration-300 hover:scale-105"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mt-3 space-y-3">
                  <button
                    type="button"
                    className="relative bg-[#FFCB33] inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all hover:scale-105 duration-500 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                  >
                    <span className="mr-2 inline-block">
                      <svg
                        className="h-6 w-6 text-black "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                      </svg>
                    </span>
                    Sign in with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Error>
    </Loading>
  );
};

export default SignIn;

// color - rgb(79,30,223)
// right div - bg-[#FCFCFC]