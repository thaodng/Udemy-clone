import { postApi } from '../api'
import { registerUrl, sendActiveEmailUrl } from '../api/domain';

const register = ({ username, email, phone, password }) => postApi(registerUrl, { username, email, phone, password });
const sendActiveEmail = ({ email }) => postApi(sendActiveEmailUrl, { email });

export {
  register,
  sendActiveEmail
};


