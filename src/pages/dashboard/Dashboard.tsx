import { FC, useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.scss";
import { CaretDown, CheckCircle, Code } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import restEndPoints from '../../constants/restEndPoints.json';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseDetails } from '../../redux/slices/CourseSlice';
import { RootState } from "../../redux/store";
import { ICourseDetails, IModule, ITopic } from "../../utils/types/course";
import { setError, setLoading } from "../../redux/slices/StatusSlice";
import { Action } from "../../enums/actionEnum";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";


const Dashboard: FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);
  const wrapperRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const courseId = '66918ca9c063073770507559';
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance(`${restEndPoints.getCourseById}/${courseId}`);
        dispatch(setCourseDetails(response.data));
      } catch (error: any) {
        console.log(error);
        dispatch(setError({
          statusCode: error.response.status,
          message: error.response.data.error,
          action: Action.GET_COURSE_BY_ID
        }));
      } finally {
        dispatch(setLoading(false));
      }
    }
    course==null && fetchData();
  }, []);

  const course: ICourseDetails = useSelector((state: RootState) => state.course.course);

  useEffect(() => {
    if (course) {
      const firstSection = course.sections[0];
      const firstModule = firstSection.modules[0];

      setExpandedSections({ [firstSection._id]: true });
      setSelectedModule(firstModule || null);

      if (
        wrapperRefs.current[firstSection._id] &&
        listRefs.current[firstSection._id]
      ) {
        wrapperRefs.current[firstSection._id]!.style.height = `${listRefs.current[firstSection._id]!.scrollHeight
          }px`;
      }
    }
  }, [course]);

  const toggleExpand = (sectionId: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));

    if (wrapperRefs.current[sectionId] && listRefs.current[sectionId]) {
      if (expandedSections[sectionId]) {
        wrapperRefs.current[sectionId]!.style.height = "0px";
      } else {
        wrapperRefs.current[sectionId]!.style.height = `${listRefs.current[sectionId]!.scrollHeight
          }px`;
      }
    }
  };

  const handleModuleClick = (module: IModule) => {
    setSelectedModule(module);
  };
  return (
    <Loading>
      <Error>
        <div className={styles.wrapper}>
          <p className={styles.heading}>Full Stack Web Development Program</p>
          <div className={styles.wrapContainer}>
            <div className={styles.container}>
              <div className={styles.rightSide}>
                <div className={styles.rightContainer}>
                  {course &&
                    course.sections.map((section) => (
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
                              transform: `${expandedSections[section._id]
                                ? "rotate(180deg)"
                                : "rotate(0deg)"
                                }`,
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
                          <ul
                            className={styles.listItems}
                            ref={(el) => (listRefs.current[section._id] = el)}
                          >
                            {section.modules.map((module) => (
                              <li
                                key={module._id}
                                onClick={() => handleModuleClick(module)}
                                className={
                                  selectedModule?._id === module._id
                                    ? styles.selectedModule
                                    : ""
                                }
                              >
                                <div className={styles.modules}>
                                  <div className={styles.moduleHead}>
                                    <CheckCircle
                                      size={16}
                                      color="#324498"
                                      weight="fill"
                                    />
                                    <p style={{ opacity: "0.8", fontSize: "11px" }}>
                                      MODULE {module.number}
                                    </p>
                                  </div>
                                  <p style={{ marginLeft: 18 }}>{module.title}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.leftSide}>
                {selectedModule && (
                  <div className={styles.moduleDetails}>
                    <div className={styles.moduleHead}>
                      <Code size={28} color="#324498" weight="duotone" />
                      <p>{selectedModule.title}</p>
                    </div>
                    <ul className={styles.moduleBody}>
                      {selectedModule.topics.map((topic: ITopic) => (
                        <Link to={`/lecture/${selectedModule._id}/${topic._id}`}>
                          <li key={topic._id}>{topic.title}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Error>
    </Loading>
  );
};

export default Dashboard;
