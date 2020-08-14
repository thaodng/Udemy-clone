import { getApiWithToken, postApiWithToken } from '../api'
import {
  userFavoriteCoursesUrl,
  userLikeCourseUrl,
  userLikeCourseStatusUrl
} from '../api/domain';

const getUserFavoriteCourse = ({ token }) => getApiWithToken(userFavoriteCoursesUrl, token);

const getLikeCourseStatus = ({ token, courseId }) => getApiWithToken(userLikeCourseStatusUrl({ courseId }), token);

const postLikeCourse = ({ token, courseId }) => postApiWithToken(userLikeCourseUrl, token, { courseId });


export {
  getUserFavoriteCourse,
  getLikeCourseStatus,
  postLikeCourse
};