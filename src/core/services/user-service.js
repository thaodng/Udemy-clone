import user from '../../mooks/user.json';

const getUserInfo = ({ token }) => {
  if (token) {
    return {
      status: 200,
      user
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