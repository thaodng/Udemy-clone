import { getApi, postApi } from '../api'
import {
  searchCourseUrl,
  getNewCoursessUrl,
  getTopRateCoursessUrl,
  getCourseInfoUrl,
  getCourseDetailInfoUrl,
} from '../api/domain';

// my courses

// New courses
const getNewCourses = ({ limit, page }) => postApi(getNewCoursessUrl, { limit, page });

// Top rating courses
const getTopRateCourses = ({ limit, page }) => postApi(getTopRateCoursessUrl, { limit, page });

const getCourses = () => postApi(searchCourseUrl, { keyword: '' });

// "opt": { "category": [ [ "4eb0c150-8212-44ef-a90b-fcd40130ac01" ]] }
const getCoursesByCategory = ({ categoryId }) => postApi(searchCourseUrl, { keyword: '', opt: { category: [categoryId] } });

const getCourseById = ({ id }) => getApi(getCourseInfoUrl(id));

const getCourseDetailById = ({ id }) => getApi(getCourseDetailInfoUrl(id));

export {
  getNewCourses,
  getTopRateCourses,
  getCourses,
  getCoursesByCategory,
  getCourseById,
  getCourseDetailById
};