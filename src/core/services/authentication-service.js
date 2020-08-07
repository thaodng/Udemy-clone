import { postApi } from '../api'
import { registerUrl } from '../api/domain';

const register = ({ username, email, phone, password }) => postApi(registerUrl, { username, email, phone, password });

export {
  register
};


