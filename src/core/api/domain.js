const DOMAIN = 'https://api.itedu.me';

const registerUrl = `${DOMAIN}/user/register`;
const sendActiveEmailUrl = `${DOMAIN}/user/send-activate-email`;
const activeEmailUrl = `${DOMAIN}/user/activate-email`;
const loginUrl = `${DOMAIN}/user/login`;
//const loginGoogleUrl = `${DOMAIN}/user/login`;
const forgetPasswordUrl = `${DOMAIN}/user/forget-pass/send-email`;
const resetPasswordUrl = `${DOMAIN}/user/reset-password`;

const updateUserInfoUrl = `${DOMAIN}/user/update-profile`;

const getAllCategoriesUrl = `${DOMAIN}/category/all`;
const getCategoryByIdUrl = (id) => `${DOMAIN}/category/id`;

const getNewCoursessUrl = `${DOMAIN}/course/top-new`;
const getTopRateCoursessUrl = `${DOMAIN}/course/top-rate`;

// Search
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

  getNewCoursessUrl,
  getTopRateCoursessUrl,

  searchCourseAndAuthorUrl,
  searchHistoryUrl,
  deleteSearchHistoryUrl
};
