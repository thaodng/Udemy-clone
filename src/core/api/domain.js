const DOMAIN = 'https://api.itedu.me';

const registerUrl = `${DOMAIN}/user/register`;
const sendActiveEmailUrl = `${DOMAIN}/user/send-activate-email`;
const activeEmailUrl = `${DOMAIN}/user/activate-email`;
const loginUrl = `${DOMAIN}/user/login`;
const loginGoogleUrl = `${DOMAIN}/user/login-google-mobile`;
const forgetPasswordUrl = `${DOMAIN}/user/forget-pass/send-email`;
const resetPasswordUrl = `${DOMAIN}/user/reset-password`;
const updateUserInfoUrl = `${DOMAIN}/user/update-profile`;

const userFavoriteCoursesUrl = `${DOMAIN}/user/get-favorite-courses`;
const userLikeCourseUrl = `${DOMAIN}/user/like-course`;
const userLikeCourseStatusUrl = ({ courseId }) => `${DOMAIN}/user/get-course-like-status/${courseId}`;

const getAllCategoriesUrl = `${DOMAIN}/category/all`;
const getCategoryByIdUrl = (id) => `${DOMAIN}/category/${id}`;

const getAllAuthorsUrl = `${DOMAIN}/instructor`;
const getAuthorByIdUrl = (id) => `${DOMAIN}​/instructor​/detail​/${id}`;

const getNewCoursessUrl = `${DOMAIN}/course/top-new`;
const getTopRateCoursessUrl = `${DOMAIN}/course/top-rate`;
const getCourseInfoUrl = (id) => `${DOMAIN}/course/get-course-info?id=${id}`;
const getCourseDetailInfoUrl = (id) => `${DOMAIN}/course/get-course-detail/${id}/null`;

const searchCourseUrl = `${DOMAIN}/course/search`;
const searchCourseAndAuthorUrl = `${DOMAIN}/course/searchV2`;
const searchHistoryUrl = `${DOMAIN}/course/search-history`;
const deleteSearchHistoryUrl = (id) => `${DOMAIN}/course/delete-search-history/${id}`;

const getLessonDetailUrl = (courseId, lessonId) => `${DOMAIN}/lesson/detail/${courseId}/${lessonId}`;
const getLessonVideoUrl = (courseId, lessonId) => `${DOMAIN}/lesson/video/${courseId}/${lessonId}`;
const updateLessonStatusUrl = `${DOMAIN}/lesson/update-status`;
const updateCurrentTimeLessonUrl = `${DOMAIN}/lesson/update-current-time-learn-video`;


export {
  DOMAIN,
  registerUrl,
  sendActiveEmailUrl,
  activeEmailUrl,
  loginUrl,
  loginGoogleUrl,
  forgetPasswordUrl,
  resetPasswordUrl,
  updateUserInfoUrl,

  userFavoriteCoursesUrl,
  userLikeCourseUrl,
  userLikeCourseStatusUrl,

  getAllCategoriesUrl,
  getCategoryByIdUrl,

  getAllAuthorsUrl,
  getAuthorByIdUrl,

  getNewCoursessUrl,
  getTopRateCoursessUrl,
  getCourseInfoUrl,
  getCourseDetailInfoUrl,

  searchCourseUrl,
  searchCourseAndAuthorUrl,
  searchHistoryUrl,
  deleteSearchHistoryUrl,

  getLessonDetailUrl,
  getLessonVideoUrl,
  updateLessonStatusUrl,
  updateCurrentTimeLessonUrl
};
