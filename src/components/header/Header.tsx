import styles from './header.module.scss';
import logo from '../../assets/barabari_logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className={styles.logoContainer}>
        <div className={styles.img}>
          <img src={logo} alt="logo-barabari" />
        </div>
        <p>Rozgar</p>
      </div>
      <div>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
      <div className={styles.profileContainer}>
        <div>UN</div>
        <p>User Name</p>
      </div>
    </header>
  )
}

export default Header