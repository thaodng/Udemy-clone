import {
  postApi,
  getApiWithToken,
  deleteApiWithToken
} from '../api';


import {
  searchCourseAndAuthorUrl,
  searchHistoryUrl,
  deleteSearchHistoryUrl
} from '../api/domain';

// Search object { "keyword": "h", "limit": 10, "offset": 1}
const searchCourseAndAuthor = ({ searchObject }) => postApi(searchCourseAndAuthorUrl, searchObject);

// Search history
const searchHistory = ({ token }) => getApiWithToken(searchHistoryUrl, token);

// Delete search
const deleteHistory = ({ token, id }) => deleteApiWithToken(deleteSearchHistoryUrl, token, { id });

export {
  searchCourseAndAuthor,
  searchHistory,
  deleteHistory
};