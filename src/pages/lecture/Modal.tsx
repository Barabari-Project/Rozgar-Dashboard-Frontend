import React, { useEffect, useState } from "react";
import { IQuestion } from '../../utils/types/course'
import axiosInstance from "../../utils/axiosInstance";
import restEndPoints from "../../constants/restEndPoints.json";
import { setError } from "../../redux/slices/StatusSlice";
import { Action } from "../../enums/actionEnum";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { IValidationErrors } from "../../utils/types/error";
// import validationErrorMessages from  '../../constants/validationErrorMessages.json'
import { validateLectureQuestionAssignmentLink } from "../../utils/validations/validateLectureQuestionAssignmentLink";
import { Loader } from './Loader';


interface ModalProps {
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedQuestion: IQuestion | null
} // need to be check

const Modal: React.FC<ModalProps> = ({ link, setLink, setOpenModal, selectedQuestion }) => {

  // const [isValidLink, setIsValidLink] = useState<boolean>(true);
  const [isDisabled, setDisabled] = useState<boolean>(false)

  const dispatch = useDispatch();
  const handleSubmitClick = async () => {
    const tempErrors: IValidationErrors = validateLectureQuestionAssignmentLink(link);

    if (Object.keys(tempErrors).length > 0) {
      Object.values(tempErrors).forEach(error => {
        toast.warn(error);
      });
      return;
    }

    setDisabled(true)

    const data = {
      questionId: selectedQuestion?._id,
      link: link
    }

    console.log(data);

    try {
      const response = await axiosInstance.post(restEndPoints.submitQuestion, data);
      toast.success(response.data.message);
    }
    catch (error: any) {
      dispatch(setError({
        statusCode: error.response.status,
        message: error.response.data.error,
        action: Action.SUBMIT_QUESTION
      }));
    }

    setDisabled(false)
    setOpenModal(false)
    setLink("")
  }

  useEffect(() => {
    // Add overflow-hidden class to body when the modal is open
    document.body.classList.add("overflow-hidden");

    // Remove overflow-hidden class from body when the modal is closed
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []); // We have to check before sending code to the production


  const closeModal = () => {
    setDisabled(false)
    setOpenModal(false)
    setLink("")
  }

  return (
    <div id="modal" className="w-full h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0  z-50 duration-500 flex justify-center items-center">
      <div className="relative w-1/2 lg:w-1/3 min-w-[318px] h-fit bg-white rounded-xl flex flex-col px-5 py-12">
        <span
          onClick={closeModal}
          className="rounded-sm hover:bg-red-200 absolute top-4 right-4 hover:cursor-pointer hover:scale-110 duration-500">❌</span>

        <div className="w-full max-w-s p-5 bg-white rounded-lg font-mono">
          <label
            className="block text-gray-700 text-lg font-bold mb-4"
            htmlFor="unique-input"
          >
            Submission Link
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter Link here"
            type="text"
            id="unique-input"
            name="unique-input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={isDisabled}
          />
        </div>
        <br />
        <div className="w-full flex justify-evenly items-center mb-4">
          <span className="flex gap-5 items-center">
            <button
              onClick={closeModal}
              className="bg-rose-500 shadow-xl text-white px-4 py-2 rounded-lg hover:bg-rose-600 duration-300">Close</button>
            {!isDisabled ? (<button
              onClick={
                () => handleSubmitClick()
              }
              className="bg-green-500 shadow-xl text-white px-4 py-2 rounded-lg hover:bg-green-600 duration-300">Submit</button>)
              : (<Loader /> // create loading
              )}

          </span>
        </div>



      </div>
    </div>
  );
}

export default Modal;


/*   render() */
