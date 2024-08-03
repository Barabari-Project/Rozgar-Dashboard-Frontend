/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, useRef } from "react";
import styles from "./dashboardMobile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CaretDown, CheckCircle } from "@phosphor-icons/react";
import axiosInstance from "../../../utils/axiosInstance";
import restEndPoints from "../../../constants/restEndPoints.json";
import { setCourseDetails } from "../../../redux/slices/CourseSlice";
import { RootState } from "../../../redux/store";
import { ICourseDetails, ISection } from "../../../utils/types/course";
import { setError, setLoading } from "../../../redux/slices/StatusSlice";
import { Action } from "../../../enums/actionEnum";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#324498",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#324498",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const DashboardMobile: FC = () => {
  const [selectedSection, setSelectedSection] = useState<ISection | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const wrapperRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  const course: ICourseDetails = useSelector(
    (state: RootState) => state.course.course
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const courseId = "66ade2067921724f6897a918";
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance(
        `${restEndPoints.getCourseById}/${courseId}`
      );
      dispatch(setCourseDetails(response.data));
      if (response.data.sections.length > 0) {
        setSelectedSection(response.data.sections[0]);
        setExpandedSections({
          [response.data.sections[0].modules[0]._id]: true,
        });
      }
    } catch (error: any) {
      dispatch(
        setError({
          statusCode: error.response.status,
          message: error.response.data.error,
          action: Action.GET_COURSE_BY_ID,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSectionClick = (section: ISection) => {
    setSelectedSection(section);
  };

  const toggleExpand = (moduleId: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId],
    }));

    if (wrapperRefs.current[moduleId] && listRefs.current[moduleId]) {
      if (expandedSections[moduleId]) {
        wrapperRefs.current[moduleId]!.style.height = "0px";
      } else {
        wrapperRefs.current[moduleId]!.style.height = `${listRefs.current[moduleId]!.scrollHeight
          }px`;
      }
    }
  };

  return (
    <Loading>
      <Error>
        <div className={styles.wrapper}>
          <p style={{ fontWeight: "700", fontSize: "16px" }}>{course?.title}</p>
          <div className={styles.sliderContainer}>
            <Slider {...settings}>
              {course?.sections?.map((section) => (
                <div
                  key={section._id}
                  className={styles.sectionName}
                  onClick={() => handleSectionClick(section)}
                >
                  <div className={styles.sectionDetails}>
                    <span className={styles.sectionNumber}>
                      {section.number}
                    </span>
                    <span className={styles.sectionTitle}>{section.title}</span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className={styles.moduleStorage}>
            {selectedSection && (
              <div className={styles.modulesContainer}>
                <p className={styles.moduleHeader}>
                  Modules in {selectedSection.title}
                </p>
                {selectedSection.modules.map((module) => (
                  <div key={module._id} className={styles.module}>
                    <div
                      className={styles.moduleHeadWrap}
                      onClick={() => toggleExpand(module._id)}
                    >
                      <div className={styles.moduleHeadGroup}>
                        <div className={styles.mSecHead}>
                          <CheckCircle
                            size={16}
                            color="#324498"
                            weight="fill"
                          />
                          <p>MODULE {module.number}</p>
                        </div>
                        <p className={styles.mSecTitle}>{module.title}</p>
                      </div>
                      <CaretDown
                        size={20}
                        style={{
                          cursor: "pointer",
                          transform: `${expandedSections[module._id]
                              ? "rotate(180deg)"
                              : "rotate(0deg)"
                            }`,
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>

                    <div
                      className={styles.moduleContent}
                      ref={(el) => (wrapperRefs.current[module._id] = el)}
                      style={{
                        height: expandedSections[module._id] ? "auto" : "0px",
                        overflow: "hidden",
                        transition: "height 0.3s ease",
                      }}
                    >
                      <ul ref={(el) => (listRefs.current[module._id] = el)}>
                        {module.topics.map((topic) => (
                          <Link
                            to={`/lecture/${selectedSection._id}/${module._id}/${topic._id}`}
                            key={topic._id}
                          >
                            <li>{topic.title}</li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Error>
    </Loading>
  );
};

export default DashboardMobile;
