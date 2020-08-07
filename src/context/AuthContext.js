import createDataContext from './createDataContext';
import { register } from '../core/services/authentication-service';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return { token: null, message: action.payload }; // signup success, now active your account
    case 'signin':
      return { token: action.payload, message: '' }; // login success, no error message (if exists)
    case 'signout':
      return { token: null, message: '' };
    case 'add_error': // return new object with new message
      return { ...state, message: action.payload }; // this update state will make SignUpScreen or SignInScreen re-render
    case 'clear_error_message':
      return { ...state, message: '' };
    default:
      return state;
  }
};


// function return async function
// context generate will call this function first, 
// and we - developer will call this function after that
const signup = dispatch => async ({ username, email, phone, password }) => {
  try {
    const { data: { status, message } } = await register({ username, email, phone, password }); // make api request to sign up
    if (status === 200) {
      dispatch({ type: 'signup', payload: 'Register success, now active your account!' });
    }
  } catch (err) {
    if (err.response) {
      dispatch({ type: 'add_error', payload: err.response.data.message });
    } else {
      dispatch({ type: 'add_error', payload: err.message });
    }
  }
};



export const { Provider, Context } = createDataContext(
  authReducer,
  { signup },
  { token: null, message: '' }
);
