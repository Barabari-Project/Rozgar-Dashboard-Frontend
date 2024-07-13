import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { showErrorToast } from "../../utils/helper/helper";
import styles from "./dashboard.module.scss";
import { CaretDown, CheckCircle, Code } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface TopicData {
  _id: string;
  title: string;
  url: string;
}

interface ModuleData {
  _id: string;
  number: number;
  title: string;
  topics: TopicData[];
}

interface SectionData {
  _id: string;
  title: string;
  number: number;
  modules: ModuleData[];
}

interface CourseData {
  _id: string;
  title: string;
  sections: SectionData[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<CourseData | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const wrapperRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const res = await axios.get<CourseData>(
        "http://localhost:3001/courses/668fdf1e85fa43238a05f739"
      );
      setData(res.data);
      console.log("data", res.data);

      // Set the first section and module as expanded and selected
      if (res.data.sections.length > 0) {
        const firstSection = res.data.sections[0];
        const firstModule = firstSection.modules[0];

        setExpandedSections({ [firstSection._id]: true });
        setSelectedModule(firstModule || null);

        if (
          wrapperRefs.current[firstSection._id] &&
          listRefs.current[firstSection._id]
        ) {
          wrapperRefs.current[firstSection._id]!.style.height = `${
            listRefs.current[firstSection._id]!.scrollHeight
          }px`;
        }
      }
    } catch (err) {
      showErrorToast("An unexpected error occurred");
    }
  };

  const toggleExpand = (sectionId: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));

    if (wrapperRefs.current[sectionId] && listRefs.current[sectionId]) {
      if (expandedSections[sectionId]) {
        wrapperRefs.current[sectionId]!.style.height = "0px";
      } else {
        wrapperRefs.current[sectionId]!.style.height = `${
          listRefs.current[sectionId]!.scrollHeight
        }px`;
      }
    }
  };

  const handleModuleClick = (module: ModuleData) => {
    setSelectedModule(module);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>Full Stack Web Development Program</p>
      <div className={styles.wrapContainer}>
        <div className={styles.container}>
          <div className={styles.rightSide}>
            <div className={styles.rightContainer}>
              {data &&
                data.sections.map((section) => (
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
                          transform: `${
                            expandedSections[section._id]
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
                  {selectedModule.topics.map((topic) => (
                    <Link to={`/${topic.url}`}>
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
  );
};

export default Dashboard;
