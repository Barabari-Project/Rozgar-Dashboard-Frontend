import React from 'react';
import Hero from '../../components/Hero/Hero';
import styles from "./Home.module.scss";
import Curriculum from '../../components/curriculum/Curriculum';
import Footer from '../signIn/Marquee';

const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
        <Hero />
        <Curriculum />
        <Footer />
    </div>
  )
}

export default Home;
