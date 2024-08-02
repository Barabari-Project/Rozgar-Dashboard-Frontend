import React from 'react';
import Hero from '../../components/Hero/Hero';
import styles from "./Home.module.scss";
import Curriculum from '../../components/curriculum/Curriculum';

const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
        <Hero />
        <Curriculum />
    </div>
  )
}

export default Home;
