import React, { useState } from "react";
import styles from "./Curriculum.module.scss";
import coursesData from "../../data/courses.json";

const Curriculum: React.FC = () => {
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
    <div className={styles.curriculumSection}>
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
              <div
                key={index}
                className={`${styles.moduleTitle} ${
                  index === activeModule ? styles.active : ""
                }`}
                onClick={() => handleModuleClick(index)}
              >
                {module.Title}
              </div>
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

export default Curriculum;
