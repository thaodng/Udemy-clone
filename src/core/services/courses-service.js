import { getApi, getApiWithToken, postApi, postApiWithToken } from '../api'
import {
  searchCourseUrl,
  getNewCoursessUrl,
  getTopRateCoursessUrl,
  getProcessCoursesUrl,
  getCourseInfoUrl,
  getCourseDetailInfoUrl,
  getFreeCourseUrl,
  ratingCourseUrl
} from '../api/domain';

// my courses

// New courses
const getNewCourses = ({ limit, page }) => postApi(getNewCoursessUrl, { limit, page });

// Top rating courses
const getTopRateCourses = ({ limit, page }) => postApi(getTopRateCoursessUrl, { limit, page });

// My courses
const getMyCourses = ({ token }) => getApiWithToken(getProcessCoursesUrl, token);

const getCourses = () => postApi(searchCourseUrl, { keyword: '' });

// "opt": { "category": [ [ "4eb0c150-8212-44ef-a90b-fcd40130ac01" ]] }
const getCoursesByCategory = ({ categoryId }) => postApi(searchCourseUrl, { keyword: '', opt: { category: [categoryId] } });

const getCourseById = ({ id }) => getApi(getCourseInfoUrl(id));

const getCourseDetailById = ({ id }) => getApi(getCourseDetailInfoUrl(id));

const registerFreeCourse = ({ token, courseId }) => postApiWithToken(getFreeCourseUrl, token, { courseId });

// rating{courseId, formalityPoint, contentPoint, presentationPoint, content}
const ratingCourse = ({ token, rating }) => postApiWithToken(ratingCourseUrl, token, rating);

export {
  getNewCourses,
  getTopRateCourses,
  getMyCourses,
  getCourses,
  getCoursesByCategory,
  getCourseById,
  getCourseDetailById,
  registerFreeCourse,
  ratingCourse
};