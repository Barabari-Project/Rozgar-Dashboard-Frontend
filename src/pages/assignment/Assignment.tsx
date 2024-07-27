// src/components/Assignment.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface AssignmentProps {}

const Assignment: React.FC<AssignmentProps> = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className='flex items-center justify-center h-[90vh] w-full px-8 bg-[#ECEEEF]'>
      <div className='rounded-xl shadow-xl bg-white flex flex-col px-5'>
        <h1 className='bg-[#324498] text-xl font-semibold'>Assignment</h1>
        <div className='rounded-xl bg-[#E6EBF0] w-full flex flex-col gap-4'>

          {user?.submissions?.map(
            (question: any) =>
              (
                <div
                  key={question._id}
                  className="w-full bg-white h-fit min-h-fit py-2 flex flex-col md:flex-row justify-evenly md:justify-between items-start md:items-center rounded-xl md:px-4 px-1 md:pr-5 hover:shadow-xl duration-500  hover:translate-y-[-5px]"
                >
                  {/* left part */}
                  <div className="flex h-full items-center max-w-full w-full md:max-w-3/4 md:w-3/4 overflow-hidden gap-3 pl-2">

                    <a
                      style={{ textOverflow: "ellipsis" }}
                      href="#"
                      target="_blank"
                      className="hover:text-[#324498] "
                    >
                      {question?.question}
                    </a>
                  </div>

                  {/* right part */}
                  <div className="flex h-full pl-3 md:pl-0 items-center gap-3">
                    <a href={question?.link} target="_blank" className="">
                      <button className="bg-[#324498] text-[#a7b4ee] border border-[#7087f0] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                        <span className="bg-[#324498] shadow-[#7087f0] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        Link
                      </button>
                    </a>

                    <button
                    //   onClick={
                    //     () => {
                    //       setOpenModal(true);
                    //       setSelectedQuestion(question);
                    //     }
                    //   }
                      className="bg-yellow-950 text-[#FFCB33] border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                      <span className="bg-[#FFCB33] shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                      Submitted
                    </button>
                  </div>
                </div>
              )
          )}

        </div>
    
      </div>
    </div>
  );
};

export default Assignment;
