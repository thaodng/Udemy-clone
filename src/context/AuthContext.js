import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import {
  register,
  sendActiveEmail,
  login,
  forgetPassword,
  resetPassword
} from '../core/services/authentication-service';


const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { token: action.payload, isAuthenticated: true, message: '', errorMessage: '' }; // login success, no error message (if exists)
    case 'signout':
      return { token: null, message: '', isAuthenticated: false, message: '', errorMessage: '' };
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
    //const { data: { status } } = await register({ username, email, phone, password }); // make api request to sign up
    //if (status === 200) {
    dispatch({ type: 'add_message', payload: 'signup' });
    //}
  } catch (err) {
    if (err.response) {
      dispatch({ type: 'add_error', payload: err.response.data.message });
    } else {
      dispatch({ type: 'add_error', payload: err.message });
    }
  }
};

const sendActivateEmail = dispatch => async ({ email }) => {
  try {
    //const { data: { status } } = await sendActiveEmail({ email }); // make api request to sign up
    //if (status === 200) {
    dispatch({ type: 'add_message', payload: 'active' });
    //}
  } catch (err) {
    if (err.response) {
      dispatch({ type: 'add_error', payload: err.response.data.message });
    } else {
      dispatch({ type: 'add_error', payload: err.message });
    }
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const status = 200;
    // const { data: { status } } = await login({ email, password }); // make api request to sign up
    if (status === 200) {
      await AsyncStorage.setItem('token', 'response.data.token');
      dispatch({ type: 'signin', payload: 'response.data.token' });
      // await AsyncStorage.setItem('token', response.data.token);
      // dispatch({ type: 'signin', payload: response.data.token });
    }
  } catch (err) {
    if (err.response) {
      dispatch({ type: 'add_error', payload: err.response.data.message });
    } else {
      dispatch({ type: 'add_error', payload: err.message });
    }
  }
};

const forgetPass = dispatch => async ({ email }) => {
  try {
    const status = 200;
    // const { data: { status } } = await forgetPassword({ email }); // make api request to sign up
    if (status === 200) {
      dispatch({ type: 'add_message', payload: 'forget' });
    }
  } catch (err) {
    if (err.response) {
      dispatch({ type: 'add_error', payload: err.response.data.message });
    } else {
      dispatch({ type: 'add_error', payload: err.message });
    }
  }
};

const resetPass = dispatch => async ({ id, password }) => {
  try {
    const status = 200;
    // const { data: { status } } = await resetPassword({ id, password }); // make api request to sign up
    if (status === 200) {
      dispatch({ type: 'add_message', payload: 'newpass' });
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
  { signup, sendActivateEmail, signin, forgetPass, resetPass, clearErrorMessage },
  { token: null, isAuthenticated: false, message: '', errorMessage: '' }
);
