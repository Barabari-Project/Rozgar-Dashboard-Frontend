import React, { useEffect, useState } from "react";
import { ICourseDetails, IModule, ITopic } from "../../utils/types/course";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LecturePageTab from "../../utils/enums/LecturePageTab";
import VideoTab from "./VideoTab";
import AssignmentTab from "./AssignmentTab";
import QuestionTab from "./QuestionTab";
import NotesTab from "./NotesTab";
import "./lecture.css";

const LectureDashboard: React.FC = () => {

  const course: ICourseDetails = useSelector(
    (state: RootState) => state.course.course
  );

  const { topicId, sectionId, moduleId } = useParams();

  const [module, setModule] = useState<IModule | null>(null);

  const [tab, setTab] = useState<LecturePageTab>(LecturePageTab.Video);

  const [activeTopic, setActiveTopic] = useState<ITopic | null>(null);

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

        const topic = selectedModule.topics.find(
          (topic) => topic._id === topicId
        );
        setActiveTopic(topic ?? null);
      }
    }
  }, [course, topicId, sectionId, moduleId]);

  return (
    <>
      <div>
        <div className="flex relative lg:flex-row flex-col gap-5 p-2 md:py-6 md:px-6 bg-[#eceeef] w-full">
          {/* left */}
          <div
            id="left"
            className="lg:max-h-[108vh] pt-7 pb-4 px-1 sm:px-2 md:px-4 lg:px-5 w-full lg:w-3/4 bg-white rounded-xl lg:shadow-lg"
          >
            <h1 className="border-l-8 text-[#324498] font-semibold text-xl font-semifold border-[#FFCB33] bg-white px-4 py-1">
              {module?.title}
            </h1>

            {/* tab */}
            <div
              id="tabs"
              className="tab-container flex items-center w-full h-[40px] mt-2 pb-1 border-b-2 border-gray-400 px-1 overflow-hidden"
            >
              <div
                className={`${
                  tab === LecturePageTab.Video
                    ? "bg-[#fee496] text-black"
                    : "text-[#595959]"
                } px-5 h-full flex items-center hover:cursor-pointer duration-500 rounded-xl`}
                onClick={() => setTab(LecturePageTab.Video)}
              >
                Lecture
              </div>
              <div
                className={`${
                  tab === LecturePageTab.Question
                    ? "bg-[#fee496] text-black"
                    : "text-[#595959]"
                } px-5 h-full flex items-center hover:cursor-pointer duration-500 rounded-xl`}
                onClick={() => setTab(LecturePageTab.Question)}
              >
                Problems
              </div>
              <div
                className={`${
                  tab === LecturePageTab.Assignment
                    ? "bg-[#fee496] text-black"
                    : "text-[#595959]"
                } px-5 h-full flex items-center hover:cursor-pointer duration-500 rounded-xl`}
                onClick={() => setTab(LecturePageTab.Assignment)}
              >
                Assignments
              </div>
              <div
                className={`${
                  tab === LecturePageTab.Notes
                    ? "bg-[#fee496] text-black"
                    : "text-[#595959]"
                } px-5 h-full flex items-center hover:cursor-pointer duration-500 rounded-xl`}
                onClick={() => setTab(LecturePageTab.Notes)}
              >
                Notes
              </div>
            </div>

            <div className="max-h-[90%] overflow-scroll overflow-y-auto duration-500">
              {tab === LecturePageTab.Video ? (
                <VideoTab topic={activeTopic} />
              ) : tab === LecturePageTab.Assignment ? (
                <AssignmentTab topic={activeTopic} />
              ) : tab === LecturePageTab.Question ? (
                <QuestionTab topic={activeTopic} />
              ) : (
                <NotesTab topic={activeTopic} />
              )}
            </div>

            {/* <div className="w-full border-t-2 border-grey-400 py-2 lg:py-4">
            <h2 className="text-start text-2xl font-semibold px-2">Content</h2>
            <span className="flex items-center px-4">➡️<a href="#" className="text-[#324498] underline">Link</a></span>
            
          </div> */}
          </div>

          {/* right */}
          <div
            id="Right"
            className="w-full max-h-[108vh] overflow-hidden lg:w-1/4 bg-white rounded-xl lg:shadow-lg"
          >
            {/* Module Heading */}
            <div className="flex gap-4 items-center px-4 pt-3 text-md text-ellipsis xl:pt-5 pb-3 hover:bg-[rgb(245,235,235)] shadow-md hover:cursor-pointer duration-300">
              <span className="text-md bg-slate-200 rounded-full flex justify-center items-center w-[35px] h-[35px]">
                {module?.number || "1"}
              </span>
              <span className="font-bold">{module?.title || "Module"}</span>
            </div>

            {/* Lecture List */}
            <div className="flex flex-col lg:overflow-scroll max-h-[93%] w-full">
              {module?.topics.map((topic) => (
                <div
                  onClick={() => {
                    setTab(LecturePageTab.Video);
                    setActiveTopic(topic);
                  }}
                  key={topic._id}
                  className={`${
                    topic._id === activeTopic?._id ? "bg-[#ffecb3]" : ""
                  } flex gap-4 w-full items-center px-4 py-5 border-grey-300 border-t-[1px] border-b-[1px] hover:bg-[#ffecb3] hover:cursor-pointer duration-300`}
                >
                  <div className="flex items-center gap-3">
                    <label className="text-white">
                      <input
                        className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5 marked:bg-[#FFCB33] dark:checked:bg-[#FFCB33]"
                        type="checkbox"
                      />
                    </label>
                  </div>
                  <div className="flex items-center text-sm">{topic.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureDashboard;
