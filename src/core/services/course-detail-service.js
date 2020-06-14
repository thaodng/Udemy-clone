import CourseDetail from '../../models/CourseDetail';
import details from '../../mocks/details.json';


const getCourseDetail = (courseId) => {
  const dataDetails = details.filter(detail => detail.courseId === courseId).map(d => new CourseDetail(d));

  if (dataDetails) {
    return {
      status: 200,
      data: dataDetails
    };
  } else {
    return {
      status: 404,
      errorString: 'Database not found!'
    }
  }
};


export { getCourseDetail };