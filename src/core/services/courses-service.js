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

export { getCourses };