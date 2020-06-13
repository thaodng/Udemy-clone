import User from '../../models/User';
import authors from '../../mocks/authors.json'

const dataAuthors = authors.map(author => new User(author));

const getAuthors = () => {
  if (dataAuthors) {
    return {
      status: 200,
      authors: dataAuthors
    };
  } else {
    return {
      status: 404,
      errorString: 'Database not found!'
    }
  }
};



export { getAuthors };