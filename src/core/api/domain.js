const DOMAIN = 'https://api.itedu.me';

const registerUrl = `${DOMAIN}/user/register`;
const sendActiveEmailUrl = `${DOMAIN}/user/send-activate-email`;
const activeEmailUrl = `${DOMAIN}/user/activate-email`;
const loginUrl = `${DOMAIN}/user/login`;
const loginGoogleUrl = `${DOMAIN}/user/login-google-mobile`;
const forgetPasswordUrl = `${DOMAIN}/user/forget-pass/send-email`;
const resetPasswordUrl = `${DOMAIN}/user/reset-password`;

const updateUserInfoUrl = `${DOMAIN}/user/update-profile`;

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

export {
  DOMAIN,
  registerUrl,
  sendActiveEmailUrl,
  activeEmailUrl,
  loginUrl,
  //loginGoogleUrl,
  forgetPasswordUrl,
  resetPasswordUrl,

  updateUserInfoUrl,

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
  deleteSearchHistoryUrl
};
