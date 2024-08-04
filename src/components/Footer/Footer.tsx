import React from "react";
import "./style.scss";
import PagesName from "./PagesName";
import ContactInfo from "./ContactInfo";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer">
        <div className="credits">
          <h2>This platform is built by students of <br /> the same program!</h2>
          <div className="developerImageContainer">
            <a
              title="Drumil Akhenia"
              href="https://www.linkedin.com/in/drumil-akhenia/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer drumil"
            >
              <img src="/assets/developer/drumil.jpg" alt="drumil" />
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
            {/* <a
              title="Anchit Julaniya"
              href="https://www.linkedin.com/in/mayank-gupta-752328173/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer mayank"
            >
              <img src="/assets/developer/anchit.jpg" alt="mayank" />
            </a> */}
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
