import createDataContext from './createDataContext';
import { register, sendActiveEmail } from '../core/services/authentication-service';
import axios from 'axios';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { token: action.payload, message: '', errorMessage: '' }; // login success, no error message (if exists)
    case 'signout':
      return { token: null, message: '', errorMessage: '' };
    case 'add_message':
      return { ...state, message: action.payload, errorMessage: '' };
    case 'add_error': // return new object with new message
      return { ...state, message: '', errorMessage: action.payload }; // this update state will make SignUpScreen or SignInScreen re-render
    case 'clear_error_message':
      return { ...state, message: '', errorMessage: '' };
    default:
      return state;
  }
};


// function return async function
// context generate will call this function first, 
// and we - developer will call this function after that
const signup = dispatch => async ({ username, email, phone, password }) => {
  try {
    //const { data: { status } } = await axios.post('https://api.itedu.me/user/register', { username, email, phone, password });
    const { data: { status } } = await register({ username, email, phone, password }); // make api request to sign up
    if (status === 200) {
      dispatch({ type: 'add_message', payload: 'Đăng ký thành công, vui lòng kích hoạt tài khoản!' });
    }
  } catch (err) {
    if (err.response) {
      dispatch({ type: 'add_error', payload: err.response.data.message });
    } else {
      dispatch({ type: 'add_error', payload: err.message });
    }
  }};

const sendActivateEmail = dispatch => async ({ email }) => {
  try {
    const { data: { status }, message } = await sendActiveEmail({ email }); // make api request to sign up
    if (status === 200) {
    dispatch({ type: 'add_message', payload: 'Chúng tôi đã gửi email kích hoạt!' });
    }
  } catch (err) {
    if (err.response) {
      dispatch({ type: 'add_error', payload: err.response.data.message });
    } else {
      dispatch({ type: 'add_error', payload: err.message });
    }
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, sendActivateEmail, clearErrorMessage },
  { token: null, message: '', errorMessage: '' }
);
