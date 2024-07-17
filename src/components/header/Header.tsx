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
      {/* <div className={styles.profileContainer}>
        <div>UN</div>
        <p>User Name</p>
      </div> */}
      <div className={styles.btnContainer}>

          <button className={styles.signUp}>Sign Up</button>
          <button className={styles.signIn}>Sign In</button>

      </div>
    </header>
  )
}

export default Header