import {
  postApi,
  putApiWithToken
} from '../api';

import {
  registerUrl,
  sendActiveEmailUrl,
  loginUrl,
  loginGoogleUrl,
  forgetPasswordUrl,
  resetPasswordUrl,
  updateUserInfoUrl
} from '../api/domain';

const register = ({ username, email, phone, password }) => postApi(registerUrl, { username, email, phone, password });
const sendActiveEmail = ({ email }) => postApi(sendActiveEmailUrl, { email });
const login = ({ email, password }) => postApi(loginUrl, { email, password });
const loginMobile = ({ email, id }) => postApi(loginGoogleUrl, { user: { email, id } });
const forgetPassword = ({ email }) => postApi(forgetPasswordUrl, { email });
const resetPassword = ({ id, password }) => postApi(resetPasswordUrl, { id, password });


// newInfo: {name, avatar, phone}
const updateUser = ({ token, newInfo }) => putApiWithToken(updateUserInfoUrl, token, newInfo);

export {
  register,
  sendActiveEmail,
  login,
  loginMobile,
  forgetPassword,
  resetPassword,
  updateUser
};


