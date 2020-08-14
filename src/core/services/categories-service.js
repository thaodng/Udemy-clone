import { getApi } from '../api'
import {
  getAllCategoriesUrl
} from '../api/domain';

const getCategories = () => getApi(getAllCategoriesUrl);

export { getCategories };