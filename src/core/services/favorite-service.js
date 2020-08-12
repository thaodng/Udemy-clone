import { getApiWithToken, postApiWithToken } from '../api'
import {
  userFavoriteCoursesUrl,
  userLikeCourseUrl
} from '../api/domain';

const getUserFavoriteCourse = ({ token }) => getApiWithToken(userFavoriteCoursesUrl, token);

const postLikeCourse = ({ token, id }) => postApiWithToken(userLikeCourseUrl, token, { id });


export {
  getUserFavoriteCourse,
  postLikeCourse
};