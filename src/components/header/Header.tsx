import React from 'react';
import styles from './header.module.scss';
import logo from '../../assets/barabari_logo.png'

const Header = () => {
  return (
    <header>
      <div className={styles.logoContainer}>
        <div className={styles.img}>
          {/* <img src={logo} alt="logo-barabari" /> */}
        </div>
        {/* <p>Rozgar</p> */}
      </div>
      <div className={styles.profileContainer}>
        {/* <div>T</div>
        <p>Trisha Das</p> */}
      </div>
    </header>
  )
}

export default Header