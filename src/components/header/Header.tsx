import styles from './header.module.scss';
import logo from '../../assets/barabari_logo.png'
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ICourseDetails } from '../../utils/types/course';

const Header = () => {

  // How to use course
  const course: ICourseDetails = useSelector((state: RootState) => state.course.course); // Assuming 'course' is the slice name and 'user' is the state field

  return (
    <header>
      <div className={styles.logoContainer}>
        <div className={styles.img}>
          <img src={logo} alt="logo-barabari" />
        </div>
        <p>Rozgar</p>
      </div>
      <div className={styles.profileContainer}>
        <div>UN</div>
        <p>User Name</p>
      </div>
    </header>
  )
}

export default Header