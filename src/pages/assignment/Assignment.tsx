import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import restEndPoints from "../../constants/restEndPoints.json";
import axiosInstance from "../../utils/axiosInstance";
import { setError, setLoading } from "../../redux/slices/StatusSlice";
import { Action } from "../../enums/actionEnum";
import { UserSubmissionWithQuestion } from "../../utils/types/user";
import QuestionType from "../../utils/enums/QuestionType";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

interface AssignmentProps { }

const Assignment: React.FC<AssignmentProps> = () => {
  const [selectValue, setSelectValue] = useState<QuestionType>(QuestionType.Question);
  const dispatch = useDispatch();
  const [submissionList, setSubmissionList] = useState<UserSubmissionWithQuestion[]>([]);

  const getAllSubmittedQuestions = async () => {

    try {
      dispatch(setLoading(true));
      const response = await axiosInstance(`${restEndPoints.getAllSubmittedQuestions}`);
      setSubmissionList(response.data.submission);
    } catch (error: any) {
      dispatch(setError({
        statusCode: error.response.status,
        message: error.response.data.error,
        action: Action.GET_ALL_SUBMITTED_QUESTIONS
      }));
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getAllSubmittedQuestions();
  }, []);

  return (
    <Loading>
      <Error>
        <div style={{ height: 'calc(100vh - 60px)' }} className="flex items-center justify-center w-full p-2 md:p-5 lg:p-8 bg-[#ECEEEF]">
          <div className="rounded-xl shadow-xl bg-white flex flex-col px-1 py-5 md:p-5 w-full h-full">
            <div className="relative group rounded-lg w-64 bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9] mx-auto lg:mx-0">
              <svg
                y="0"
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                width="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                height="100"
                className="w-8 h-8 absolute right-0 -rotate-45 stroke-[#324498] top-1.5 group-hover:rotate-0 duration-300"
              >
                <path
                  stroke-width="4"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  fill="none"
                  d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                  className="svg-stroke-primary"
                ></path>
              </svg>
              <select
                onChange={(e) => {
                  if (e.target.value == QuestionType.Question)
                    setSelectValue(QuestionType.Question);
                  else
                    setSelectValue(QuestionType.Assignment);
                }}
                className="appearance-none hover:placeholder-shown:bg-emerald-500 relative text-[#324498] bg-transparent ring-0 outline-none border border-neutral-500 placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5">
                <option value={QuestionType.Question}>Questions</option>
                <option value={QuestionType.Assignment}>Assignment</option>

              </select>

            </div>
            <br />

            <hr />
            <br />

            <div className="rounded-xl bg-white w-full flex flex-col gap-4">
              {submissionList.map((submission: UserSubmissionWithQuestion, index: number) => {
                return selectValue == submission.question.type && (
                  <div
                    key={submission.id}
                    className="w-full bg-[#E6EBF0] h-fit min-h-fit py-2 flex flex-col md:flex-row justify-evenly md:justify-between items-start md:items-center rounded-xl md:px-4 px-1 md:pr-5 hover:shadow-xl duration-500  hover:translate-y-[-5px]"
                  >
                    {/* left part */}
                    <div className="flex h-full items-center max-w-full w-full md:max-w-3/4 md:w-3/4 overflow-hidden gap-3 pl-2">
                      <span>{index + 1}.</span>
                      <a
                        style={{ textOverflow: "ellipsis" }}
                        href="#"
                        target="_blank"
                        className="hover:text-[#324498] "
                      >
                        {submission?.question.title}
                      </a>
                    </div>

                    {/* right part */}
                    <div className="flex h-full pl-3 md:pl-0 items-center gap-3">
                      <a href={submission?.question.url} target="_blank" className="">
                        <button className="bg-[#324498] text-[#a7b4ee] border border-[#7087f0] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                          <span className="bg-[#324498] shadow-[#7087f0] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                          Link
                        </button>
                      </a>

                      <a href={submission?.link} target="_blank" className="">
                        <button
                          className="bg-yellow-950 text-[#FFCB33] border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                        >
                          <span className="bg-[#FFCB33] shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                          Submitted
                        </button>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Error>
    </Loading>
  );
};

export default Assignment;
