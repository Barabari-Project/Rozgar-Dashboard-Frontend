import styles from "./header.module.scss";
import logo from "../../assets/barabari_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ASSIGNMENT, DASHBOARD, HOME, PROFILE, SIGNIN } from "../../constants/routesEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  return (
    <header>
      <div className={styles.logoContainer} onClick={() => navigate(HOME)} >
        <div className={styles.img}>
          <img src={logo} alt="logo-barabari" />
        </div>
        <p>Rozgar</p>
      </div>
      <button onClick={() => { navigate(DASHBOARD) }}>Dashboard</button>

      <div className={styles.btnContainer}>
        <button className={styles.signUp} onClick={() => navigate(ASSIGNMENT)}>
          {user ? ("Submission") : ("Donation")}
        </button>
        {user ? (
          <div
            className={styles.profileContainer}
            onClick={() => navigate(PROFILE)}
          >
            <div>UN</div>
          </div>
        ) : (

          <button className={styles.signIn} onClick={() => navigate(location.pathname == HOME ? SIGNIN : HOME)}>
            {location.pathname == HOME && "Sign In"}
            {location.pathname == SIGNIN && "Sign Up"}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
