import React, { useEffect } from "react";
import "./style.scss";
import PagesName from "./PagesName";
import ContactInfo from "./ContactInfo";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  useEffect(() => {
    const anchitElement = document.querySelector('.developer.anchit') as HTMLElement;
    const trishaElement = document.querySelector('.developer.trisha') as HTMLElement;

    const handleMouseEnter = () => {
      if (trishaElement) {
        trishaElement.style.zIndex = '1';
      }
    };

    const handleMouseLeave = () => {
      if (trishaElement) {
        trishaElement.style.zIndex = '3';
      }
    };

    if (anchitElement) {
      anchitElement.addEventListener('mouseenter', handleMouseEnter);
      anchitElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (anchitElement) {
        anchitElement.removeEventListener('mouseenter', handleMouseEnter);
        anchitElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <footer>
      <div className="footer">
        <div className="credits">
          <h2>This platform is built by students of <br /> the same program!</h2>
          <div className="developerImageContainer">
            <a
              title="Trisha Das"
              href="https://www.linkedin.com/in/trisha-das1308/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer trisha"
            >
              <img src="/assets/developer/trisha.jpg" alt="trisha" />
            </a>
            <a
              title="Mayank Gupta"
              href="https://www.linkedin.com/in/mayank-gupta-752328173/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer mayank"
            >
              <img src="/assets/developer/mayank.jpg" alt="mayank" />
            </a>
            <a
              title="Anchit Julaniya"
              href="https://www.linkedin.com/in/mayank-gupta-752328173/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer anchit"
            >
              <img src="/assets/developer/anchit.jpg" alt="mayank" />
            </a>
          </div>
        </div>
        <div className="information">
          <ContactInfo />
          <div className="footer_rightSection">
            <PagesName />
            <div className="another-navigation">
              <ul>
                <li>
                  <Link style={{ color: "white" }} to="#">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link style={{ color: "white" }} to="#">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link style={{ color: "white" }} to="#">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
