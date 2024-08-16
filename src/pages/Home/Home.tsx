import React from 'react';
import Hero from '../../components/Hero/Hero';
import styles from "./Home.module.scss";
import Curriculum from '../../components/curriculum/Curriculum';
import Footer from '../signIn/Footer';
import Error from '../../components/error/Error';

const Home: React.FC = () => {
  return (
    <Error>
      <div className={styles.homePage}>
        <Hero />
        <Curriculum />
        <Footer />
      </div>
    </Error>
  )
}

export default Home;
