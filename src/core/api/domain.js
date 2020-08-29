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

// https://api.itedu.me/user/recommend-course/01671008-c8c1-4f04-9694-711e81d92165/10/0
const getRecommendCoursesUrl = (userId) => `${DOMAIN}/user/recommend-course/${userId}/10/0`;
const getNewCoursessUrl = `${DOMAIN}/course/top-new`;
const getTopRateCoursessUrl = `${DOMAIN}/course/top-rate`;
const getProcessCoursesUrl = `${DOMAIN}/user/get-process-courses`;
const getCourseInfoUrl = (id) => `${DOMAIN}/course/get-course-info?id=${id}`;
const getCourseDetailInfoUrl = (id) => `${DOMAIN}/course/get-course-detail/${id}/null`;

const searchCourseUrl = `${DOMAIN}/course/search`;
const searchCourseAndAuthorUrl = `${DOMAIN}/course/searchV2`;
const searchHistoryUrl = `${DOMAIN}/course/search-history`;
const deleteSearchHistoryUrl = (id) => `${DOMAIN}/course/delete-search-history/${id}`;

const getLastWatchedLessonUrl = (courseId) => `${DOMAIN}/course/last-watched-lesson/${courseId}`;
const getLessonDetailUrl = (courseId, lessonId) => `${DOMAIN}/lesson/detail/${courseId}/${lessonId}`;
const getLessonVideoUrl = (courseId, lessonId) => `${DOMAIN}/lesson/video/${courseId}/${lessonId}`;
const updateLessonStatusUrl = `${DOMAIN}/lesson/update-status`;
const updateCurrentTimeLessonUrl = `${DOMAIN}/lesson/update-current-time-learn-video`;

const getFreeCourseUrl = `${DOMAIN}/payment/get-free-courses`;

const ratingCourseUrl = `${DOMAIN}/course/rating-course`;

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

  getRecommendCoursesUrl,
  getNewCoursessUrl,
  getTopRateCoursessUrl,
  getProcessCoursesUrl,
  getCourseInfoUrl,
  getCourseDetailInfoUrl,

  searchCourseUrl,
  searchCourseAndAuthorUrl,
  searchHistoryUrl,
  deleteSearchHistoryUrl,

  getLastWatchedLessonUrl,
  getLessonDetailUrl,
  getLessonVideoUrl,
  updateLessonStatusUrl,
  updateCurrentTimeLessonUrl,

  getFreeCourseUrl,
  ratingCourseUrl
};
