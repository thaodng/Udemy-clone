import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import {
  register,
  sendActiveEmail,
  login,
  forgetPassword,
  resetPassword,
  updateUser
} from '../core/services/authentication-service';


const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        token: action.payload,
        isAuthenticated: true,
        userInfo: action.userInfo,
        message: '',
        errorMessage: ''
      }; // login success, no error message (if exists)
    case 'signout':
      return {
        token: null,
        isAuthenticated: false,
        userInfo: {},
        message: '',
        errorMessage: ''
      };

    case 'update_info': return {
      ...state,
      userInfo: action.payload
    };

    case 'add_message':
      return {
        ...state,
        message: action.payload,
        errorMessage: ''
      };
    case 'add_error': // return new object with new message
      return {
        ...state,
        message: '',
        errorMessage: action.payload
      }; // this update state will make SignUpScreen or SignInScreen re-render
    case 'clear_error_message':
      return {
        ...state,
        message: '',
        errorMessage: ''
      };
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
    // const status = 200;
    const { status, data: { token, userInfo } } = await login({ email, password }); // make api request to sign up
    if (status === 200) {
      //await AsyncStorage.setItem('token', 'response.data.token');
      // dispatch({ type: 'signin', payload: 'response.data.token' });
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'signin', payload: token, userInfo });
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

const updateUserInfo = dispatch => async ({ token, newInfo }) => {
  try {
    // const { status, data: { payload } } = await updateUser({ token, newInfo });

    const { payload } = await updateUser({ token, newInfo });
    dispatch({ type: 'update_info', payload });
    console.log(payload);
    
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
  {
    signup,
    sendActivateEmail,
    signin,
    forgetPass,
    resetPass,
    updateUserInfo,
    clearErrorMessage
  },
  {
    // token: null,
    // isAuthenticated: false,
    // userInfo: {},
    // message: '',
    // errorMessage: '',
    // isRequest: false
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyYzk2NmM3LTk2OWMtNDMzZi04YzYzLTFiZTBhM2RlM2U4OSIsImlhdCI6MTU5NzMyNzkxNywiZXhwIjoxNTk3MzM1MTE3fQ.c-9yp-DEATi1S17uH2-F9ib1y4UkIQ2o__Pfa7RMgGU',
    isAuthenticated: true,
    userInfo: {
      id: '22c966c7-969c-433f-8c63-1be0a3de3e89',
      email: 'ngduythao2805@outlook.com',
      avatar: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FEducationApp-9ea25b12-3aac-434f-88e0-befa01c8f001/ImagePicker/a7ebe7b3-a525-42b9-b3ed-f3c3cea72ab4.jpg',
      name: 'Thao Nguyen Duy',
      favoriteCategories: [],
      point: 0,
      phone: '0909123456',
      type: 'STUDENT',
      isDeleted: false,
      isActivated: true,
      createdAt: '2020-08-07T06:55:41.265Z',
      updatedAt: '2020-08-07T17:16:20.284Z'
    },
    message: '',
    errorMessage: '',
    isRequest: false
  }
);
