import { FC, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import restEndPoints from '../../constants/restEndPoints.json';
import { useDispatch } from 'react-redux';
import { setCourseDetails } from '../../redux/slices/CourseSlice';


const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const courseId = '66918ca9c063073770507559';
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance(`${restEndPoints.getCourseById}/${courseId}`);
      dispatch(setCourseDetails(response.data));
      console.log(response);
    }
    fetchData();
  }, []);
  return (
    <div>
      Dashboard
    </div>
  );
}

export default Dashboard;