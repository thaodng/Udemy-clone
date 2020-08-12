import { getApi } from '../api'
import {
  getAllAuthorsUrl,
  getAuthorByIdUrl
} from '../api/domain';

const getAuthors = () => getApi(getAllAuthorsUrl);
const getAuthorById = ({ id }) => getApi(getAuthorByIdUrl(id));

export { getAuthors, getAuthorById };