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


const signup = ({ email, password }) => {
  if (email && password) {
    return {
      status: 200,
      message: 'Create account success!'
    }
  } else {
    return {
      status: 400,
      errorString: 'Email has exists!!'
    }
  }
};


const forgetPassword = ({ email }) => {
  if (email) {
    return {
      status: 200,
      message: 'We have sent reset password link to your email'
    }
  } else {
    return {
      status: 400,
      errorString: `Email doesn't exists!!`
    }
  }
};


const newPassword = ({ password, password2 }) => {
  if (password && password2) {
    return {
      status: 200,
      message: 'Reset password success'
    }
  } else {
    return {
      status: 400,
      errorString: `Email doesn't exists!!`
    }
  }
};

export { login, signup, forgetPassword, newPassword };