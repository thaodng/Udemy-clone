import Course from '../../models/Course';
import courses from '../../mocks/courses.json';

const dataCourses = courses.map(course => new Course(course));

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

const getCoursesByAuthor = (authorId) => {
  return dataCourses.filter(course => course.authorIds.includes(authorId));
};

const getCoursesByCategory = (categoryId) => {
  return dataCourses.filter(course => course.categoryId === categoryId);
};

export { getCourses, getCoursesByAuthor, getCoursesByCategory };