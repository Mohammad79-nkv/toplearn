import http from './httpService';
import config from './config.json'
export const getCourses = () => {
    return http.get(`${config.toplearnapi}/api/courses`);
}