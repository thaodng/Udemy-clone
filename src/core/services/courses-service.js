import { postApi } from '../api'
import {
  getNewCoursessUrl,
  getTopRateCoursessUrl
} from '../api/domain';

// my courses

// New courses
const getNewCourses = ({ limit, page }) => postApi(getNewCoursessUrl, { limit, page });

// Top rating courses
const getTopRateCourses = ({ limit, page }) => postApi(getTopRateCoursessUrl, { limit, page });


const getCourses = () => {
  if (dataCourses) {
    return {
      status: 200,
      courses: dataCourses
    };
  } else {
    return {
      status: 404,
      errorString: 'Database not found!'
    }
  }
};


const getCourseById = (courseId) => {
  return dataCourses.find(course => course.id === courseId);
}

const getCoursesByAuthor = (authorId) => {
  return dataCourses.filter(course => course.authorIds.includes(authorId));
};

const getCoursesByCategory = (categoryId) => {
  return dataCourses.filter(course => course.categoryId === categoryId);
};

const getCoursesByTitle = (title) => {
  return dataCourses.filter(course => course.title.toLowerCase().includes(title.toLowerCase()));
};

export {
  getNewCourses,
  getTopRateCourses,
  getCourses,
  getCourseById,
  getCoursesByAuthor,
  getCoursesByCategory,
  getCoursesByTitle
};