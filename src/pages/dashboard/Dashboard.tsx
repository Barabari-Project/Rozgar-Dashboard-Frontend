import React, { FC, useEffect, useRef, useState } from "react";
import { showErrorToast } from "../../utils/helper/helper";
import styles from "./dashboard.module.scss";
import { CaretDown, CheckCircle } from "@phosphor-icons/react";


import axiosInstance from '../../utils/axiosInstance';
import restEndPoints from '../../constants/restEndPoints.json';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseDetails } from '../../redux/slices/CourseSlice';
import { getCourseById } from "../../services/course/getCourseById";
import { RootState } from "../../redux/store";
import { ICourseDetails } from "../../utils/types/course";


const Dashboard: React.FC = () => {
  // const [data, setData] = useState<CourseData | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const wrapperRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  // const dispatch = useDispatch();
  // dispatch(setCourseDetails(response.data));

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCourseById('668fdf1e85fa43238a05f739');
      console.log(response);
      // dispatch(setCourseDetails(response.data));
    }
    fetchData();
  }, []);

  const course: ICourseDetails = useSelector((state: RootState) => state.course.course);


  const toggleExpand = (sectionId: string, moduleId: string) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionId]: !prevState[sectionId]
    }));

    if (wrapperRefs.current[sectionId] && listRefs.current[sectionId]) {
      if (expandedSections[sectionId]) {
        wrapperRefs.current[sectionId]!.style.height = "0px";
      } else {
        wrapperRefs.current[sectionId]!.style.height = `${listRefs.current[sectionId]!.scrollHeight}px`;
      }
    }

    // Find and set the selected module
    const selectedSection = data?.sections.find(section => section._id === sectionId);
    const selectedModule = selectedSection?.modules.find(module => module._id === moduleId);
    setSelectedModule(selectedModule || null);
  };

  return (
    // <>hello</>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.rightSide}>
          <p className={styles.heading}>Full Stack Web Development Program</p>
          {data && data.sections.map((section) => (
            <div className={styles.courseContainer} key={section._id}>
              <div className={styles.courseHead}>
                <div className={styles.names}>
                  <p className={styles.serialNum}>{section.number}</p>
                  <p>{section.title}</p>
                </div>
                <CaretDown
                  size={20}
                  style={{
                    cursor: "pointer",
                    transform: `${expandedSections[section._id] ? "rotate(180deg)" : "rotate(0deg)"}`,
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => toggleExpand(section._id)}
                />
              </div>
              <div
                ref={(el) => (wrapperRefs.current[section._id] = el)}
                style={{
                  height: "0px",
                  overflow: "hidden",
                  transition: "height 0.3s ease",
                }}
              >
                <ul className={styles.listItems} ref={(el) => (listRefs.current[section._id] = el)}>
                  {section.modules.map((module) => (
                    <li key={module._id} onClick={() => setSelectedModule(module)}>
                      <div className={styles.modules}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}>
                          <CheckCircle size={16} color="#324498" weight="fill" />
                          <p style={{ opacity: "0.8", fontSize: "12px" }}>MODULE{' '}{module.number}</p>
                        </div>
                        <p>{module.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.leftSide}>
          {selectedModule && (
            <div className={styles.moduleDetails}>
              <h2>{selectedModule.title}</h2>
              <ul>
                {selectedModule.topics.map((topic) => (
                  <li key={topic._id}>
                    <a href={topic.url} target="_blank" rel="noopener noreferrer">
                      {topic.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
