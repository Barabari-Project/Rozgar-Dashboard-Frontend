import styles from "./header.module.scss";
import logo from "../../assets/barabari_logo.png";
import { useNavigate } from "react-router-dom";
import { ASSIGNMENT, SIGNIN } from "../../constants/routesEndpoints";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header>
      <div className={styles.logoContainer}>
        <div className={styles.img}>
          <img src={logo} alt="logo-barabari" />
        </div>
        <p>Rozgar</p>
      </div>

      <div className={styles.btnContainer}>
        <button className={styles.signUp} onClick={() => navigate(ASSIGNMENT)}>
          {!isLogin ? ("Submission") : ("Donation")}
        </button>
        {!isLogin ? (
          <div
            className={styles.profileContainer}
            onClick={() => navigate("/profile")}
          >
            <div>UN</div>
          </div>
        ) : (
          
          <button className={styles.signIn} onClick={() => navigate(SIGNIN)}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
