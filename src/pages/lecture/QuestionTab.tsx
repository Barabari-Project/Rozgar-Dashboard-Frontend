// import axiosInstance from "../../utils/axiosInstance";
// import restEndPoints from "../../constants/restEndPoints.json";
// import { toast } from 'react-toastify';
// import { setError } from "../../redux/slices/StatusSlice";
// import { Action } from "../../enums/actionEnum";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import { ITopic, IAssignmentLink, IQuestion } from "../../utils/types/course";
import Modal from "./Modal";
import QuestionType from "../../utils/enums/QuestionType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserSubmission } from "../../utils/types/user";

interface QuestionTabProps {
  topic: ITopic | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  link: IAssignmentLink | null;
  selectedQuestion: IQuestion | null;
}

const QuestionTab: React.FC<QuestionTabProps> = ({ topic }) => {

  const { user } = useSelector((state: RootState) => state.user);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [link, setLink] = useState<string>("")
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);

  const getUserSubmission = (question: IQuestion): UserSubmission => {
    return user.submissions.find((submission: UserSubmission) => submission.question == question._id);
  };

  return (
    <>
      {openModal && <Modal link={link} setLink={setLink} setOpenModal={setOpenModal} selectedQuestion={selectedQuestion} />}
      <div className="bg-[#E6EBF0] p-1 md:p-5 m-1 md:m-3 rounded-xl">
        <h1 className="text-start text-lg font-semibold text-[#324498] px-2 md:p-0">
          Question Tab
        </h1>

        <br />
        <div className="w-full flex flex-col gap-4  ">
          {topic?.questions?.map(
            (question) => {
              const userSubmission: UserSubmission = getUserSubmission(question);
              return (
                question.type == QuestionType.Question && (
                  <div
                    key={question._id}
                    className="w-full bg-white h-fit min-h-fit py-2 flex flex-col md:flex-row justify-evenly md:justify-between items-start md:items-center rounded-xl md:px-4 px-1 md:pr-5 hover:shadow-xl duration-500  hover:translate-y-[-5px]"
                  >
                    {/* left part */}
                    <div className="flex h-full items-center max-w-full w-full md:max-w-3/4 md:w-3/4 overflow-hidden gap-3 pl-2">
                      <span>{question.number}.</span>
                      <label className="text-white">
                        <input
                          className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5 mt-1
                             marked:bg-[#FFCB33]
                             dark:checked:bg-[#FFCB33]"
                          type="checkbox"
                          checked={userSubmission ? true:false}
                          readOnly
                        />
                      </label>

                      <a
                        style={{ textOverflow: "ellipsis" }}
                        href="#"
                        target="_blank"
                        className="hover:text-[#324498] "
                      >
                        {question?.title}
                      </a>
                    </div>

                    {/* right part */}
                    <div className="flex h-full pl-3 md:pl-0 items-center gap-3">
                      <a href={question?.url} target="_blank" className="">
                        <button className="bg-[#324498] text-[#a7b4ee] border border-[#7087f0] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                          <span className="bg-[#324498] shadow-[#7087f0] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                          Link
                        </button>
                      </a>

                      <button
                        onClick={
                          () => {
                            setOpenModal(true)
                            setSelectedQuestion(question);
                            userSubmission.link && setLink(userSubmission.link);
                          }
                        }
                        className="bg-yellow-950 text-[#FFCB33] border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                        <span className="bg-[#FFCB33] shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        {userSubmission ? 'Submitted' : 'Submit'}
                      </button>
                    </div>
                  </div>
                )
              )
            }
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionTab;
