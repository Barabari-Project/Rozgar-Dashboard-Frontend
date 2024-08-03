import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";

const PagesName: React.FC = () => {
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (scrollToCourses && location.pathname === "/") {
      const timer = setTimeout(() => {
        const element = document.getElementById("courses");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setScrollToCourses(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location, scrollToCourses]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagesContainer">
      <ul>
        <li>
          <Link to="/" state={{ isForceFull: true }} onClick={scrollToTop}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/course-details">Courses</Link>
        </li>
        <li>
          <Link to="/values">About Us</Link>
        </li>
        <li>
          <Link to="/contact" onClick={scrollToTop}>
            Contact Us
          </Link>
        </li>
        {/* <li>
          <Link to="/faqs" onClick={scrollToTop}>FAQs</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default PagesName;
