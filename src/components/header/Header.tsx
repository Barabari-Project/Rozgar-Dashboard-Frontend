import styles from './header.module.scss';
import logo from '../../assets/barabari_logo.png'
import { useNavigate } from 'react-router-dom';
import { ASSIGNMENT, SIGNIN, SIGNUP } from '../../constants/routesEndpoints';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className={styles.logoContainer}>
        <div className={styles.img}>
          <img src={logo} alt="logo-barabari" />
        </div>
        <p>Rozgar</p>
      </div>
      <div className={styles.profileContainer} onClick={() => navigate("/profile")}>
        <div>UN</div>
        <p>User Name</p>
      </div>
      <div className={styles.btnContainer}>
        <span onClick={()=>navigate(ASSIGNMENT)}>assignment</span>
        <button className={styles.signUp} onClick={() => navigate(SIGNUP)}>Sign Up</button>
        <button className={styles.signIn} onClick={()=> navigate(SIGNIN)}>Sign In</button>

      </div>
    </header>
  )
}

export default Header