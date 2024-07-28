/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FloppyDisk, PencilSimpleLine } from "@phosphor-icons/react";
import styles from "./profile.module.scss";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { User } from "../../utils/types/user";
import axiosInstance from "../../utils/axiosInstance";
import restEndPoints from "../../constants/restEndPoints.json";
import { setError, setLoading } from "../../redux/slices/StatusSlice";
import { Action } from "../../enums/actionEnum";
import { setUserDetails } from "../../redux/slices/UserSlice";
import { validateProfileForm } from "../../utils/validations/validateProfileForm";
import { IValidationErrors } from "../../utils/types/error";
import { Link } from "react-router-dom";
import { ASSIGNMENT } from "../../constants/routesEndpoints";
import { Gender } from "../../utils/enums/Gender";

const Profile: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<IValidationErrors>({});
  const [data, setData] = useState<User>(user);
  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  const dispatch = useDispatch();
  console.log(user);
  const handleEdit = async () => {
    setEditClicked(false);
    const tempErrors: IValidationErrors = validateProfileForm(user);

    const _body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      university: data.university,
      degree: data.degree,
      region: data.region,
      gender: data.gender,
      organisationName: data.organization,
    };

    if (Object.keys(tempErrors).length === 0) {
      dispatch(setLoading(true));
      try {
        dispatch(setLoading(true));
        const res = await axiosInstance.post(`${restEndPoints.profileUpdate}`, {
          user: _body,
        });
        console.log(res);
        dispatch(setUserDetails({ ...res.data }));
      } catch (err: any) {
        dispatch(
          setError({
            statusCode: err.response.status,
            message: err.response.data.error,
            action: Action.PROFILE,
          })
        );
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      setFormErrors(tempErrors);
    }

  };

  const handleFieldChange = (field: keyof User, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <Loading>
      <Error>
        <div className="bg-gray-200 p-8 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="w-full h-[250px]">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <div className="w-40 h-40 border-4 border-white rounded-full bg-[#324498] text-center text-[68px] text-slate-100 py-6">{initials}</div>
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-xl capitalize">
                  {user?.firstName || "Drumil"} {user?.lastName || "akenia"}
                </p>
                <span className="bg-[#324498] rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">Phone No.: {user?.phoneNumber || 123123}</p>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <div className="flex items-center space-x-4 mt-2">
                <Link to={ASSIGNMENT} className="flex items-center bg-[#324498] hover:bg-[#293779] text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  View Submission
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-8 border border-solid relative flex flex-col">
            <div className={styles.labelWrap}>
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  First Name
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"} text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="Jane"
                  disabled={!editClicked}
                  value={data.firstName}
                  onChange={(e) => handleFieldChange("firstName", e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  Last Name
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"} text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="Doe"
                  disabled={!editClicked}
                  value={data.lastName}
                  onChange={(e) => handleFieldChange("lastName", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.labelWrap}>
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  Email ID
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"
                    } text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="abc@gmail.com"
                  disabled={!editClicked}
                  value={data.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                />
                {formErrors.email && <p className='text-red-500'>{formErrors.email}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  Phone Number
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"} text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="+91 1231231231"
                  disabled={!editClicked}
                  value={data.phoneNumber}
                  onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.labelWrap}>
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  University Name
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"} text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="ABC university"
                  disabled={!editClicked}
                  value={data.university}
                  onChange={(e) => handleFieldChange("university", e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  Degree
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"} text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="B.tech"
                  disabled={!editClicked}
                  value={data.degree}
                  onChange={(e) => handleFieldChange("degree", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.labelWrap}>
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  Region
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"} text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="Hindu, Muslim, Christan etc..."
                  disabled={!editClicked}
                  value={data.region}
                  onChange={(e) => handleFieldChange("region", e.target.value)}
                />
                {formErrors.region && <p className='text-red-500'>{formErrors.region}</p>}
              </div>
              <div className={styles.labelWrap}>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                    Gender
                  </label>
                  <select
                    className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"
                      } text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                    disabled={!editClicked}
                    value={data.gender}
                    onChange={(e) =>
                      handleFieldChange("gender", e.target.value)
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value={Gender.Male}>Male</option>
                    <option value={Gender.Female}>Female</option>
                    <option value={Gender.Other}>Others</option>
                  </select>
                  {formErrors.gender && <p className='text-red-500'>{formErrors.gender}</p>}
                </div>
              </div>
            </div>
            <div className={styles.labelWrap}>
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2">
                  Organisation Name
                </label>
                <input
                  className={`appearance-none block w-full ${editClicked ? "" : "bg-gray-200"
                    } text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  type="text"
                  placeholder="ABC company"
                  disabled={!editClicked}
                  value={data.organization}
                  onChange={(e) =>
                    handleFieldChange("organization", e.target.value)
                  }
                />
                {formErrors.organisationName && <p className='text-red-500'>{formErrors.organisationName}</p>}
              </div>
            </div>
            {!editClicked ? (
              <div
                className="absolute top-3 right-5"
                onClick={() => setEditClicked(true)}
              >
                <PencilSimpleLine
                  className="text-[#324498] cursor-pointer"
                  size={24}
                />
              </div>
            ) : (
              <div className="absolute top-3 right-5" onClick={handleEdit}>
                <FloppyDisk
                  className="text-[#324498] cursor-pointer"
                  size={24}
                />
              </div>
            )}
          </div>
        </div>
      </Error>
    </Loading>
  );
};

export default Profile;
