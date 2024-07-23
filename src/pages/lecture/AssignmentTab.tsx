const AssignmentTab: React.FC = ({ lecture, setOpenModal }) => {
  // console.log(lecture, "AssignmentTab lecture");

  return (
    <>
      <div className="bg-[#E6EBF0] p-1 md:p-5 m-1 md:m-3 rounded-xl">
        <h1 className="text-start text-lg font-semibold text-[#324498] px-2 md:p-0">
          Assignment Tab
        </h1>

        <br />
        <div className="w-full flex flex-col gap-4  ">
          {lecture?.questions?.map(
            (question, index) =>
              question.title.includes("Assignment Title") && (
                <div
                  key={question?.id}
                  className="w-full bg-white h-fit min-h-[100px] md:min-h-[55px] flex flex-col md:flex-row justify-evenly md:justify-between items-start md:items-center rounded-xl md:px-4 px-1 md:pr-5 hover:shadow-xl duration-500  hover:translate-y-[-5px]"
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
                         console.log("openModal", true)
                        }
                    }
                      className="bg-yellow-950 text-[#FFCB33] border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                      <span className="bg-[#FFCB33] shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                      Submission
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default AssignmentTab;
