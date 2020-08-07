import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import { register } from '../core/services/authentication-service';
import { postApi } from '../core/api';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { token: action.payload, errorMessage: '' }; // login success, no error message (if exists)
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'add_error': // return new object with new errorMessage
      return { ...state, errorMessage: action.payload }; // this update state will make SignUpScreen or SignInScreen re-render
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

// function return async function
// context generate will call this function first, 
// and we - developer will call this function after that
const signup = dispatch => async ({ username, email, phone, password }) => {
  try {
    // const response = await postApi('https://api.itedu.me/user/register', { username, email, phone, password });
    const response = await register({ username, email, phone, password }); // make api request to sign in 
    console.log(response);
    dispatch({ type: 'signin', payload: '123456789' });

    // if we sign in, modify our state, and say that we are authenicated
    // await AsyncStorage.setItem('token', response.data.token);
    console.log('OK!');
  } catch (err) {
    console.log(err);
    console.log('Error!');
  }
};



export const { Provider, Context } = createDataContext(
  authReducer,
  { signup },
  { token: null, errorMessage: '' }
);
