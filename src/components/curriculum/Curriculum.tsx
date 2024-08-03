import React, { useState } from "react";
import styles from "./Curriculum.module.scss";
import coursesData from "../../data/courses.json";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Topic {
  Title: string;
  Topics: string[];
}

interface Course {
  Title: string;
  Modules: Topic[];
}

interface ModuleProps {
  activeModule: number;
  onClick: () => void;
  index: number;
  module: Topic;
  isSmallDevice: boolean;
  selectedCourse: Course | undefined;
}

const Curriculum: React.FC = () => {
  const isSmallDevice = useMediaQuery(1023);
  const [activeCourse, setActiveCourse] = useState<string>("WebDev");
  const [activeModule, setActiveModule] = useState<number>(0);

  const selectedCourse = coursesData.find(
    (course) => course.Title === activeCourse
  );

  const handleCourseClick = (course: string) => {
    setActiveCourse(course);
    setActiveModule(0);
  };

  const handleModuleClick = (idx: number) => {
    setActiveModule(idx);
  };

  return (
    <div className={styles.curriculumSection} id="curriculumSection">
      <div className={styles.curriculum}>
        <h2 className={styles.sectionTitle}>
          <strong>Curriculum</strong> is designed to make you a{" "}
          <span>
            <strong>solid engineer</strong>
          </span>
        </h2>
        <div className={styles.coursesTitleGrid}>
          <div
            className={`${styles.coursesTitle} ${
              activeCourse === "WebDev" ? styles.active : ""
            }`}
            onClick={() => handleCourseClick("WebDev")}
          >
            <div className={styles.titleBox}>
              <h2>WebDev</h2>
              <div className={styles.selectiveCircle}>
                {activeCourse === "WebDev" ? (
                  <div className={styles.selected}></div>
                ) : null}
              </div>
            </div>
          </div>
          <div
            className={`${styles.coursesTitle} ${
              activeCourse === "Design" ? styles.active : ""
            }`}
            onClick={() => handleCourseClick("Design")}
          >
            <div className={styles.titleBox}>
              <h2>Design</h2>
              <div className={styles.selectiveCircle}>
                {activeCourse === "Design" ? (
                  <div className={styles.selected}></div>
                ) : null}
              </div>
            </div>
          </div>
          <div
            className={`${styles.coursesTitle} ${
              activeCourse === "DataTools" ? styles.active : ""
            }`}
            onClick={() => handleCourseClick("DataTools")}
          >
            <div className={styles.titleBox}>
              <h2>Data Tools</h2>
              <div className={styles.selectiveCircle}>
                {activeCourse === "DataTools" ? (
                  <div className={styles.selected}></div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.courseDetails}>
          <div className={styles.ModuleTitles}>
            {selectedCourse?.Modules.map((module, index) => (
              <Module
                key={index}
                activeModule={activeModule}
                onClick={() => handleModuleClick(index)}
                index={index}
                module={module}
                isSmallDevice={isSmallDevice}
                selectedCourse={selectedCourse}
              />
            ))}
          </div>

          <div className={styles.activeModuleDetails}>
            <ul className={styles.topicList}>
              <h3>{selectedCourse?.Modules[activeModule].Title}</h3>

              {selectedCourse?.Modules[activeModule]?.Topics.map(
                (topic, idx) => (
                  <li key={idx} className={styles.topicDetail}>
                    {topic}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Module: React.FC<ModuleProps> = ({
  activeModule,
  onClick,
  index,
  module,
  isSmallDevice,
  selectedCourse,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLesson = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`${styles.moduleTitle} ${
        index === activeModule ? styles.active : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`${styles.moduleHeading} ${
          isSmallDevice ? "cursor-pointer" : ""
        }`}
        onClick={toggleLesson}
      >
        {module.Title}
        {isSmallDevice ? (
          <span className={isExpanded ? styles.expandedIcon : ""}>
            <ChevronDown />
          </span>
        ) : null}
      </div>
      <AnimatePresence>
        {isSmallDevice && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.expandedContent}
          >
            <ul className={`${styles.topicList} ${styles.expanded}`}>
              {selectedCourse?.Modules[index]?.Topics.map((topic, idx) => (
                <li key={idx} className={styles.topicDetail}>
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Curriculum;
