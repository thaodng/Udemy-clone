import Category from '../../models/Category';
import categories from '../../mocks/categories.json';

const dataCategories = categories.map(ct => new Category(ct));

const getCategories = () => {
  if (dataCategories) {
    return {
      status: 200,
      categories: dataCategories
    };
  } else {
    return {
      status: 404,
      errorString: 'Database not found!'
    }
  }
};

export { getCategories };