import settings from '../../mocks/settings.json';

const getUserSettings = ({ token }) => {
  if (token) {
    return {
      status: 200,
      settings
    };
  } else {
    return {
      status: 404,
      errorString: 'User not found!'
    }
  }
};


// const updateUserSettings = ({ newSettings, token }) => {
//   if (token) {
//     return {
//       status: 200,
//       user: {
//         ...settings,
//         ...newSettings
//       }
//     };
//   }
// };

export { getUserSettings };