import React from "react";
import "./style.scss";
import { nanoid } from "nanoid";
// import footerLogo from '../../../assets/images/footerLogo.svg';
import logo from "../../assets/barabari_logo.png";
import contactDetails from "../../constants/contactDetails.json";

const ContactInfo: React.FC = () => {
  interface ContactInfo {
    icon: JSX.Element;
    title: string;
    link: string;
  }
  const contactInfoArray: ContactInfo[] = [
    {
      icon: <i className="fa-solid fa-phone-volume"></i>,
      title: `${contactDetails.phone}`,
      link: `tel:${contactDetails.phone}`,
    },
    {
      icon: <i className="fa-regular fa-envelope"></i>,
      title: `${contactDetails.email}`,
      link: `mailto:${contactDetails.email}`,
    },
  ];

  return (
    <div className="pagesContainer">
      {/* <img className="footer-logo" src={footerLogo} /> */}
      <div className="footer-logo">
        <img src={logo} alt="" />
        <h2>Rozgar</h2>
      </div>
      <ul>
        {contactInfoArray.map((item) => (
          <a key={nanoid()} href={item.link}>
            <li key={nanoid()}>
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </li>
          </a>
        ))}
      </ul>
      <div className="social-media">
        <a
          href={contactDetails.facebook}
          target="_blank
          "
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a
          href={contactDetails.instagram}
          target="_blank
          "
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href={contactDetails.linkedin}
          target="_blank
          "
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
