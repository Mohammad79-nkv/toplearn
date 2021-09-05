import { getCourse } from "../services/courseService"

export const getSingleCourse = (courseId) => {
    const {data} = getCourse(courseId);
    return async (dispatch) => {
        await dispatch({type : "GET_COURSE" , payload : data});
    }
}