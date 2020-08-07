import { postApi } from '../api'
import {
  registerUrl,
  sendActiveEmailUrl,
  loginUrl,
  forgetPasswordUrl,
  resetPasswordUrl
} from '../api/domain';

const register = ({ username, email, phone, password }) => postApi(registerUrl, { username, email, phone, password });
const sendActiveEmail = ({ email }) => postApi(sendActiveEmailUrl, { email });
const login = ({ email, password }) => postApi(loginUrl, { email, password });
const forgetPassword = ({ email }) => postApi(forgetPasswordUrl, { email });
const resetPassword = ({ id, password }) => postApi(resetPasswordUrl, { id, password });

export {
  register,
  sendActiveEmail,
  login,
  forgetPassword,
  resetPassword
};


