import React, { useEffect, useState } from "react";
import { ICourseDetails, IModule } from "../../utils/types/course";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LecturePageTab from "../../utils/enums/LecturePageTab";
import VideoTab from "./VideoTab";
import AssignmentTab from "./AssignmentTab";
import QuestionTab from "./QuestionTab";
import "./lecture.css";

const LectureDashboard: React.FC = () => {
  const course: ICourseDetails = useSelector(
    (state: RootState) => state.course.course
  );
  const { topicId, sectionId, moduleId } = useParams();
  const [module, setModule] = useState<IModule | null>(null);
  const [tab, setTab] = useState<LecturePageTab>(LecturePageTab.Video);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [lecture, setLecture] = useState<any>(null);
  const [activeLecture, setActiveLecture] = useState<any>(null);

  useEffect(() => {
    if (course) {
      const selectedSection = course.sections.find(
        (section) => section._id === sectionId
      );
      const selectedModule = selectedSection?.modules.find(
        (module) => module._id === moduleId
      );

      if (selectedModule) {
        setModule(selectedModule);

        if (!lecture) {
          const initialLecture =
            selectedModule.topics.find((topic) => topic._id === topicId) ||
            selectedModule.topics[0];
          if (initialLecture) {
            setLecture(initialLecture);
            setVideoUrl(initialLecture.url);
            setActiveLecture(initialLecture._id);
          }
        }
      }
    }
  }, [course, topicId, sectionId, moduleId, lecture]);

  useEffect(() => {
    if (!lecture && module) {
      const initialLecture = module.topics[0];
      setActiveLecture(initialLecture._id);
      setLecture(initialLecture);
      setVideoUrl(initialLecture.url);
    }
  }, [module, lecture]);

  return (
    <>
      <div className="flex relative lg:flex-row flex-col gap-5 py-6 px-6 bg-[#eceeef] w-full">
        {/* left */}
        <div
          id="left"
          className="py-7 px-1 sm:px-2 md:px-4 lg:px-5 w-full lg:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <h1 className="border-l-8 text-[#324498] font-semibold text-xl font-semifold border-[#FFCB33] bg-white px-4 py-1">
            {module?.title}
          </h1>

          {/* tab */}
          <div
            id="tabs"
            className="tab-container flex items-center w-full h-[40px] mt-2 pb-1 border-b-2 border-gray-400"
          >
            <div
              className={`${
                tab === LecturePageTab.Video
                  ? "bg-[#fee496]"
                  : ""
              } px-5 h-full flex items-center hover:cursor-pointer duration-500 rounded-xl`}
              onClick={() => setTab(LecturePageTab.Video)}
            >
              Lecture
            </div>


            <div
              className={`${
                tab === LecturePageTab.Question
                  ? "bg-[#fee496]"
                  : ""
              } px-5 h-full flex items-center hover:cursor-pointer duration-500 rounded-xl`}
              onClick={() => setTab(LecturePageTab.Question)}
            >
              Problems
            </div>
            <div
              className={`${
                tab === LecturePageTab.Assignment
                  ? "bg-[#fee496]"
                  : ""
              } px-5 h-full flex items-center hover:cursor-pointer duration-500 rounded-xl`}
              onClick={() => setTab(LecturePageTab.Assignment)}
            >
              Assignments
            </div>
          </div>

          {tab === LecturePageTab.Video ? (
            <VideoTab lecture={lecture} />
          ) : tab === LecturePageTab.Assignment ? (
            <AssignmentTab lecture={lecture} />
          ) : (
            <QuestionTab lecture={lecture} />
          )}

          <div
            id="separator"
            className="my-4 text-black border-[1.5px] border-grey-400"
          ></div>
        </div>

        {/* right */}
        <div
          id="Right"
          className="w-full sticky top-0 lg:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden overflow-y-auto"
        >
          {/* Module Heading */}
          <div className="flex gap-4 items-center px-4 pt-3 text-md text-ellipsis xl:pt-5 pb-3 hover:bg-[rgb(245,235,235)] shadow-md hover:cursor-pointer duration-300">
            <span className="text-md bg-slate-200 rounded-full flex justify-center items-center w-[35px] h-[35px]">
              {module?.number || "1"}
            </span>
            <span className="font-bold">{module?.title || "Module"}</span>
          </div>

          {/* Lecture List */}
          {module?.topics.map((lecture, index) => (
            <div
              onClick={() => {
                setTab(LecturePageTab.Video);
                setVideoUrl(lecture.url);
                setLecture(lecture);
                setActiveLecture(lecture._id);
              }}
              key={lecture._id}
              className={`${
                lecture._id === activeLecture ? "bg-[#ffecb3]" : ""
              } flex gap-4 items-center px-4 py-5 border-grey-300 border-t-[1px] border-b-[1px] hover:bg-[#ffecb3] hover:cursor-pointer duration-300`}
            >
              <div className="flex items-center gap-3">
                <label className="text-white">
                  <input
                    className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5 marked:bg-[#FFCB33] dark:checked:bg-[#FFCB33]"
                    type="checkbox"
                  />
                </label>
              </div>
              <div className="flex items-center text-sm">{lecture?.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LectureDashboard;
