const DOMAIN = 'https://api.itedu.me';

const registerUrl = `${DOMAIN}/user/register`;
const sendActiveEmailUrl = `${DOMAIN}/user/send-activate-email`;
const activeEmailUrl = `${DOMAIN}/user/activate-email`;
const loginUrl = `${DOMAIN}/user/login`;
//const loginGoogleUrl = `${DOMAIN}/user/login`;
const forgetPasswordUrl = `${DOMAIN}/user/forget-pass/send-email`;
const resetPasswordUrl = `${DOMAIN}/user/reset-password`;

const getAllCategoriesUrl = `${DOMAIN}/category/all`;
const getCategoryByIdUrl = (id) => `${DOMAIN}/category/id`;

const getNewCoursessUrl = `${DOMAIN}/course/top-new`;
const getTopRateCoursessUrl = `${DOMAIN}/course/top-rate`;


export {
  DOMAIN,
  registerUrl,
  sendActiveEmailUrl,
  activeEmailUrl,
  loginUrl,
  //loginGoogleUrl,
  forgetPasswordUrl,
  resetPasswordUrl,

  getAllCategoriesUrl,
  getCategoryByIdUrl,

  getNewCoursessUrl,
  getTopRateCoursessUrl
};
