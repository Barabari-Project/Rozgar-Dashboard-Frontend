import axiosInstance from "../../utils/axiosInstance";
import restEndPoints from '../../constants/restEndPoints.json';

export const getCourseById = async (courseId: string) => {
    try {
        const response = await axiosInstance(`${restEndPoints.getCourseById}/${courseId}`);
        console.log(response);
        return response;
    } catch (error: any) {
        console.log(error);
        return error;
    }
}