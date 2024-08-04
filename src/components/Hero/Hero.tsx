import React, { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { Lock, Phone } from "lucide-react";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, HOME } from "../../constants/routesEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Typewriter from "typewriter-effect";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const circles = document.querySelectorAll(`.${styles.circle123}`);

    const circleStyles = [
      {
        "--ani-duration": "1s",
        "--back-color": "#334499",
        "--ani-delay": "0s",
        "--half-opacity": "0",
        "--initial-width": "57.17vw",
        "--initial-height": "57.17vw",
        "--final-width": "63.61vw",
        "--final-height": "63.61vw",
        "--h-top": "-35.5vw",
        "--v-right": "-8.46vw",
      },
      {
        "--ani-duration": "0.5s",
        "--ani-delay": "1s",
        "--h-top": "-26.88vw",
        "--v-right": "-5.85vw",
        "--half-opacity": "0.5",
        "--back-color": "rgba(255, 255, 255, 0.1)",
        "--initial-width": "48.53vw",
        "--initial-height": "48.53vw",
        "--final-width": "54.98vw",
        "--final-height": "54.98vw",
      },
      {
        "--ani-duration": "0.5s",
        "--ani-delay": "1.5s",
        "--h-top": "-22.78vw",
        "--v-right": "-6vw",
        "--half-opacity": "0.5",
        "--back-color": "rgba(255, 255, 255, 0.07)",
        "--initial-width": "44.79vw",
        "--initial-height": "44.79vw",
        "--final-width": "51.24vw",
        "--final-height": "51.24vw",
      },
    ];

    circles.forEach((circle, index) => {
      Object.entries(circleStyles[index]).forEach(([property, value]) => {
        (circle as HTMLElement).style.setProperty(property, value);
      });
    });

    const setDynamicImageSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      console.log(screenHeight, screenWidth);
      const image = document.getElementById("dynamicImage") as HTMLImageElement;
      const secondImage = document.getElementsByClassName(
        styles.secondImage123
      ) as HTMLCollectionOf<HTMLElement>;
      const thirdImage = document.getElementsByClassName(
        styles.thirdImage123
      ) as HTMLCollectionOf<HTMLElement>;

      if (image) {
        image.style.width = `${screenWidth}px`;
        image.style.height = `${screenWidth / 2 + screenWidth * 0.17}px`;
      }
      if (secondImage[0]) {
        secondImage[0].style.width = `${(screenWidth * 417) / 1536}px`;
        secondImage[0].style.height = `${(screenWidth * 374) / 1536}px`;
      }
      if (thirdImage[0]) {
        thirdImage[0].style.width = `${(screenWidth * 417) / 1536}px`;
        thirdImage[0].style.height = `${(screenWidth * 349) / 1536}px`;
      }
    };

    setDynamicImageSize();
    window.addEventListener("resize", setDynamicImageSize);

    return () => {
      window.removeEventListener("resize", setDynamicImageSize);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { phoneNumber: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      //TODO Api logic here
      setSuccess("Sign up successful!");
      setFormData({
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      navigate(HOME);
    } catch (error) {
      setErrors({ ...errors });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.animationHeader123}>
      <div className={styles.circle123}></div>
      <div className={styles.circle123}></div>
      <div className={styles.circle123}>
        <div className={styles.content}>
          <h1 className={styles.title}>India's open rozgaar program</h1>
          <div className={styles.points}>
            <h3 className={styles.subTitle}>
              Curriculum designed by domain experts.
            </h3>
            <h3 className={styles.subTitle}>
              Create your doubts via personalized mentorship.
            </h3>
          </div>
        </div>
      </div>
      <div className={styles.headerImage123} style={{ zIndex: 15 }}>
        <div className={styles.workerImg123}>
          <img
            src="/assets/images/home-11-vector-1.png"
            id="dynamicImage"
            className={styles.innerImage123}
          />
          <div className={styles.secondImageLoader123}>
            <img
              src="/assets/images/home-11-vector-2.png"
              className={styles.secondImage123}
              style={{ zIndex: 16 }}
            />
          </div>
          <div className={styles.thirdImageLoader123}>
            <img
              src="/assets/images/home-11-vector-3.png"
              className={styles.thirdImage123}
              style={{ zIndex: 17 }}
            />
          </div>
        </div>
      </div>

      <div
        className={`${styles.sectionHeader} animate__animated animate__bounceInDown`}
      >
        <h1 className={styles.title}>India's open rozgaar program</h1>
        <div className={styles.points}>
          <h3 className={styles.subTitle}>
            Curriculum designed by domain experts.
          </h3>
          <h3 className={styles.subTitle}>
            Create your doubts via personalized mentorship.
          </h3>
        </div>
      </div>

      {user ? (
        <div className={styles.leftSideText}>
          <h1 className={styles.textHeader}>
            Explore industry oriented learning pathways in{" "}
            <span>
              {
                <Typewriter
                  options={{
                    strings: ["WebDev.", "Design.", "Data Tools."],
                    autoStart: true,
                    loop: true,
                  }}
                />
              }
            </span>
          </h1>
          <h3 className={styles.textSubtitle}>
            Build a strong portfolio via paid industry projects
          </h3>
          <button
            onClick={() => navigate(DASHBOARD)}
            className={styles.coursesBtn}
          >
            Our Courses
          </button>
        </div>
      ) : (
        <div
          className={`${styles.leftSideForm} animate__animated animate__bounceInLeft`}
        >
          <div className={styles.formContainer}>
            <h2 className={styles.heading}>Sign up to Rozgar</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber" className={styles.label}>
                  Phone Number
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.iconWrapper}>
                    <Phone className={styles.icon} />
                  </span>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.phoneNumber && (
                    <p className={styles.error}>{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.iconWrapper}>
                    <Lock className={styles.icon} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.password && (
                    <p className={styles.error}>{errors.password}</p>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.iconWrapper}>
                    <Lock className={styles.icon} />
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.confirmPassword && (
                    <p className={styles.error}>{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
                {success && <p className={styles.success}>{success}</p>}
              </div>
            </form>
            <div className={styles.googleSignIn}>
              <button type="button" className={styles.googleButton}>
                <span className={styles.googleIcon}>
                  <svg
                    className={styles.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
