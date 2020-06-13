import User from '../../models/User';
import user from '../../mocks/user.json';

const dataUser = new User(user);

const getUserInfo = ({ token }) => {
  if (token) {
    return {
      status: 200,
      user: dataUser
    };
  } else {
    return {
      status: 404,
      errorString: 'User not found!'
    }
  }
};


const updateUserInfo = ({ newInfo, token }) => {
  if (token) {
    return {
      status: 200,
      user: {
        ...user,
        ...newInfo
      }
    };
  }
};

export { getUserInfo, updateUserInfo };