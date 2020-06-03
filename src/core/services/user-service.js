import user from '../../mooks/user.json';

const getUserInfo = ({ token }) => {
  if (token) {
    return { user };
  } else {
    return {
      status: 404,
      errorString: 'User not found!'
    }
  }
};

export { getUserInfo };