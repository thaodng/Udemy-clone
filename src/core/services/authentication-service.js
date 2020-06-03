const login = ({ email, password }) => {
  if (email && password) {
    return {
      status: 200,
      isAuthenicated: true,
      token: 'ThisIsToken'
    }
  } else {
    return {
      status: 404,
      errorString: 'Username and password are not correct!'
    }
  }
};

export { login };