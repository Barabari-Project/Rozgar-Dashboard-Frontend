import React from 'react';
import Hero from '../../components/Hero/Hero';
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
        <Hero />
    </div>
  )
}

export default Home;
