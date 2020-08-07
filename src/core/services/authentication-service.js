import { postApi } from '../api'
import { registerUrl, sendActiveEmailUrl, loginUrl } from '../api/domain';

const register = ({ username, email, phone, password }) => postApi(registerUrl, { username, email, phone, password });
const sendActiveEmail = ({ email }) => postApi(sendActiveEmailUrl, { email });
const login = ({ email, password }) => postApi(loginUrl, { email, password });

export {
  register,
  sendActiveEmail,
  login
};


