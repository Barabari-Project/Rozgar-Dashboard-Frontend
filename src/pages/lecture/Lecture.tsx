import React, { useEffect, useState } from "react";
import { ICourseDetails, IModule } from "../../utils/types/course";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LecturePageTab from "../../utils/enums/LecturePageTab";
import VideoTab from "./VideoTab";
import AssignmentTab from "./AssignmentTab";
import QuestionTab from "./QuestionTab";

const LectureDashboard: React.FC = () => {

  const course: ICourseDetails = useSelector((state: RootState) => state.course.course);

  const { topicId, sectionId, moduleId } = useParams();

  const [module, setModule] = useState<IModule | null>(null);

  // const [sectionTitle, setSectionTitle] = useState<string | null>(null);
  const [tab, setTab] = useState<LecturePageTab>(LecturePageTab.Video);


  console.log(module, "Module Lecture Page");
  console.log(course, "Course");
  
  console.log(moduleId, "MdduleID");
  console.log(sectionId, "sectionID");
  
  useEffect(() => {
    if (course) {
      course
        .sections
        .filter(section => section._id == sectionId)
        .forEach(section => {
          // setSectionTitle(section.title);
          section
            .modules
            .filter(module => module._id == moduleId)
            .forEach(module => setModule(module));
        })
    }
  }, [course, topicId, sectionId, moduleId]);

  return (
    <>
      <div className="flex relative lg:flex-row flex-col gap-5 py-6 px-6 bg-[#eceeef] w-full">
        {/* left */}
        <div className="py-7 px-1 sm:px-2 md:px-4 lg:px-5 w-full lg:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden">
          <h1 className="border-l-8 text-[#324498] font-semibold text-xl font-semifold border-[#FFCB33] bg-white px-4 py-1">
            Lecture Dashboard
          </h1>

          {/* tab */}
          <div className="flex items-center w-full h-[40px] mt-2 border-b-2 border-gray-400 sm:overflow-x-auto md:overscroll-none">
            <div
              className={`${tab == 'Video' ? "border-[#FFCB33] border-b-4" : ""} px-5 h-full flex items-center  hover:cursor-pointer hover:scale-110 duration-300`}
              onClick={() => setTab(LecturePageTab.Video)}
            >
              Lecture
            </div>
            <div className={`${tab == 'Question' ? "border-[#FFCB33] border-b-4" : ""} px-5 h-full flex items-center  hover:cursor-pointer hover:scale-110 duration-300`}
              onClick={() => setTab(LecturePageTab.Question)}>
              Problems
            </div>
            <div className={`${tab == 'Assignment' ? "border-[#FFCB33] border-b-4" : ""} px-5 h-full flex items-center  hover:cursor-pointer hover:scale-110 duration-300`}
              onClick={() => setTab(LecturePageTab.Assignment)}>
              Assignments
            </div>
          </div>

          {
            tab == LecturePageTab.Video ?
              <VideoTab module={module} /> :
              tab == LecturePageTab.Assignment ?
                <AssignmentTab /> :
                <QuestionTab />
          }

          {/* Video 
          <div className="w-full py-4 md:px-5">
            <iframe
              className="rounded-xl w-full aspect-[16/9]"
              // width="full" height="315"
              src="https://www.youtube.com/embed/fN74Ate46Z8?si=bNkrleFc44ltVE0t"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div> */}

          <div className="my-4 text-black border-[1.5px] border-grey-400"></div>
          <div className="">
            <h2 className="text-2xl">Content</h2>
            <a href="#" className="text-blue-500">
              Link
            </a>
          </div>
        </div>

        {/* right */}
        <div className="w-full sticky top-0 lg:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden overflow-y-auto">
          {/* Module Heading */}
          <div className="flex gap-4 items-center px-4 pt-3 text-md text-ellipsis xl:pt-5 pb-3 hover:bg-[rgb(245,235,235)] 
          shadow-md
          hover:cursor-pointer duration-300">
            <span className="text-md bg-slate-200 rounded-full flex justify-center items-center w-[35px] h-[35px]">
              1
            </span>
            <span className="font-bold">Lecture Heading</span>
          </div>

          {/* Lecture List */}
          <div className="flex gap-4 items-center px-4 py-5 border-grey-300 border-t-[1px] border-b-[1px] hover:bg-[#ffecb3] hover:cursor-pointer duration-300">

            {/* Checkbox */}
            <div className=" flex items-center gap-3">
              <label className="text-white">
                <input
                  className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 dark:checked:bg-[#FFCB33] w-5 h-5"
                  type="checkbox"
                />
              </label>
            </div>

            {/* Lecture Name */}
            <div className="flex items-center text-sm">
              Namaste DSA
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default LectureDashboard;
